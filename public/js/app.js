// 오른쪽 화살표 효과
(async function rightArrows() {
  const $rightArrows = document.querySelectorAll('.rightarrow__box');
  let $rightArrowTitle;
  let $rightArrowLine;
  let $rightArrowCircle;
  let $rightArrowImg;

  function enterEvent(e) {
    $rightArrowTitle = e.target.querySelector('.rightarrow__box__title-line__title');
    $rightArrowLine = e.target.querySelector('.rightarrow__box__title-line__line');;
    $rightArrowCircle = e.target.querySelector('.rightarrow__box__arrow');;
    $rightArrowImg = e.target.querySelector('.rightarrow__box__arrow__img');

    $rightArrowTitle.classList.add('overed');
    $rightArrowLine.classList.add('overed');
    $rightArrowCircle.classList.add('overed');
    $rightArrowImg.classList.add('overed');
  }

  async function leaveEvent(e) {
    $rightArrowTitle.classList.remove('overed');
    $rightArrowLine.classList.replace('overed', 'rewind');
    $rightArrowCircle.classList.remove('overed');
    $rightArrowImg.classList.remove('overed');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    $rightArrowLine.classList.remove('rewind');
  }

  for(let rightArrow of $rightArrows) {
    rightArrow.addEventListener('pointerenter', enterEvent);
  }

  for(let rightArrow of $rightArrows) {
    rightArrow.addEventListener('pointerleave', leaveEvent);
  }
})();

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// INTRO + MAIN
class Intro {
  constructor() {
    this.$introLogo = document.querySelector('.intro-logo');
    this.$introFlower = document.querySelector('.intro-flower');
    this.introFlowerWidth = null;

    this.$header = document.getElementById('header');
    this.$main = document.getElementById('main');

    this.$mainImgArea = document.querySelector('.main__imgs');
    this.$mainImgBoxes = Array.from(document.querySelectorAll('.main__imgs__image-box'));
    this.$mainSubTitle = document.querySelector('.main__title__subject');
    this.$mainTitle = document.querySelector('.main__title__title');
    this.$mainCurrentNum = document.querySelector('.main__bar__progress__current');
    this.$mainProgress = document.querySelector('.main__bar__progress__stick__ing');
    this.mainStackIndex = 14;
    this.mainTranslate = `translate(-50%, -50%)`;
    this.mainInitialScale = ['scale(0.5)', 'scale(0.55)', 'scale(0.6)', 'scale(0.65)', 'scale(0.7)',
    'scale(0.75)', 'scale(0.8)', 'scale(0.85)', 'scale(0.9)', 'scale(0.95)',
    'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)',
    ];
    this.mainInitialRotate = ['rotate(-3deg)', 'rotate(4deg)', 'rotate(-7deg)', 'rotate(5deg)', 'rotate(0deg)',
    ];
    this.mainAutoSlide = 14;
    this.mainSubTitle = [
      "PRODUCT DESIGN",
      "Q+A",
      "BEHIND THE SCENES",
      "BEHIND THE SCENES",
      "PRODUCT DESIGN",
      "DESIGN OPS",
      "BEHIND THE SCENES",
      "PRODUCT DESIGN",
      "PRODUCT DESIGN",
      "BEHIND THE SCENES",
      "DESIGN SYSTEMS",
      "METHODS",
      "BEHIND THE SCENES",
      "Q+A",
      "BEHIND THE SCENES",
    ];
    this.mainTitle = [
      `Beyond "Good Job": How to Give Impactful Feedback`,
      "Ask Spotify Design 06",
      "How to Stand Out as a Spotify Internship Applicant",
      "A Designer's Balancing Act: Staying Creative and Organized in Figma",
      "Finding your T-Shape as a Generalist Designer",
      "Growing, Scaling, and Tuning: Meet Spotify’s Global Head of Design Ops",
      "Backstage Tickets to the World of Service Design at Spotify",
      "Finding your T-Shape as a Specialist Designer",
      "Designing for the World: An Introduction to Localization",
      "From Web Page to Web Player: How Spotify Designed a New Homepage Experience",
      "Can I get an Encore? Spotify’s Design System, Three Years On",
      "Navigating the Discovery Phase",
      "Making Moves: Designing Motion for 2022 Wrapped",
      "Ask Spotify Design 07",
      "Collaboration Secrets: Design X Engineering",
    ];
    this.mainBackgroundColor = [
      "#ffbc4a", "#ffd0d5", "#ffd0d5", "#ffd0d5", "#ffbc4a",
      "#ffbc4a", "#ffd0d5", "#ffbc4a", "#ffbc4a", "#ffd0d5",
      "#ffbc4a", "#a5c9d8", "#ffd0d5", "#ffd0d5", "#ffd0d5"
    ];

    this.$mainNextBtn = document.querySelector('.main__btns__next');
    this.$mainPrevBtn = document.querySelector('.main__btns__prev');
    this.$mainShuffleBtn = document.querySelector('.main__btns__shuffle');
    this.autoTimeout = null;
    this.randomArr = [];
    this.temTitleArr = [];
    this.temSubtitleArr = [];
    this.temBackcolorArr = [];
    this.mouseTarget = null;
    this.shiftX = null;
    this.rectX = null;
    this.ratio = null;
    this.browserWidth = null;
    this.direction = null;

    this.animate = this.animate.bind(this);
    this.showFlower = this.showFlower.bind(this);
    this.disappearLogoAndFlower = this.disappearLogoAndFlower.bind(this);
    this.showCards = this.showCards.bind(this);
    this.autoSlide = this.autoSlide.bind(this);
    this.makeRandom = this.makeRandom.bind(this);
    this.arrangeShuffle = this.arrangeShuffle.bind(this);
    this.dragAndDrop = this.dragAndDrop.bind(this);
    this.moveAt = this.moveAt.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    this.forPointerUp = this.forPointerUp.bind(this);

    this.$mainPrevBtn.onclick = this.clickMainPrevBtn.bind(this);
    this.$mainNextBtn.onclick = this.clickMainNextBtn.bind(this);
    this.$mainShuffleBtn.onclick = this.clickMainShuffleBtn.bind(this);
    this.$mainImgBoxes.forEach(boxes => {
      boxes.onpointerdown = this.dragAndDrop;
    })
  }

  animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timing(timeFraction)
      draw(progress); 
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }
  
  init() {
    window.scrollTo(0, 0);
    document.body.style.overflowY = 'hidden';
    setTimeout(this.showFlower, 1500);
    setTimeout(this.disappearLogoAndFlower, 4500);
  }

  // 꽃 보여주고 꽃 너비 측정
  showFlower() {
    this.$introFlower.style.display = 'block';
    this.introFlowerWidth = this.$introFlower.offsetWidth;
  }

  disappearLogoAndFlower() {
    // 바디 hidden 풀리고, 
    // 로고 사라지고,
    document.body.style.overflowY = '';
    this.$introLogo.style.display = 'none';
    // 꽃 줄어들며 사라지고
    // 📍 마지막에 사라지는 거 추가
    this.animate({
      duration: 500,
      timing: function(timeFraction) {
        return timeFraction;
      },
      // 📍 여기 화살표 함수인거 주목, 그냥 함수는 this가 undefined된다. 
      // scale은 1 -> 0.5
      draw: (progress) => {
        this.$introFlower.style.transform = `translate3d(${-100 * progress}%, 0, 0) scale(${(-0.5 * progress) + 1})`;
      }
    });
    // 헤더와 메인 나타나고
    this.$header.style.visibility = 'visible';
    this.$main.style.visibility = 'visible';

    // 📍 슬라이드 카드 등장
    this.showCards();
  }

  async showCards() {
    if(this.mainAutoSlide === 14) {
      this.$mainPrevBtn.classList.add('deactivated');
    }
    this.$mainSubTitle.textContent = this.mainSubTitle[this.mainAutoSlide];
    this.$mainTitle.textContent = this.mainTitle[this.mainAutoSlide];
    this.$mainCurrentNum.textContent = `01`;

    let intervalId = setInterval(() => {
      this.$mainImgBoxes[this.mainStackIndex].style.transform = `${this.mainTranslate} ${this.mainInitialScale[this.mainStackIndex]} ${this.mainInitialRotate[this.mainStackIndex % 5]}`;
      this.$mainImgBoxes[this.mainStackIndex].style.left = '50%';
      this.mainStackIndex--;

      if(this.mainStackIndex < 0) {
        clearInterval(intervalId);
        // 마지막 imgBox까지 중앙으로 들어왔을때 (transition: left 0.4s라서)
        // 자동 슬라이드 시작
        new Promise((resolve) => {
          setTimeout(() => {
            this.autoSlide();
            // 처음에 진행 바 시작 => 이후 알아서 무한으로 전환
            if(this.mainAutoSlide === 14) {
              this.$mainProgress.classList.add('progress');
            }
            resolve();
          }, 400);
        });    
      }
    }, 40);
  }

  // 📍 마지막 5초 후에 다시 슬라이드 촤라라 해야하는데 바로 슬라이드 촤라라 해서 이거 5초 후 수정,
  // 📍 그리고 버튼으로 누르면 마지막 슬라이드 후에 빈공간 나타난 후에 슬라이드 촤라라
  // 📍 진행 바
  // 핑크: 14-12, 9, 6, 3-1
  // 블루: 11
  // 오렌지: 10, 8-7, 5-4, 0
  async autoSlide() {
    // 수동 버튼 클릭 시 01에서 비활성화된 버튼 다시 활성화
    if(this.$mainPrevBtn.classList.contains('deactivated') && this.mainAutoSlide === 13) {
      this.$mainPrevBtn.classList.remove('deactivated');
    }
    // mainAutoSlide는 14부터 시작
    // 바로 scale, rotate 조정
    this.$mainImgBoxes[this.mainAutoSlide].style.transform = `translate(-50%, -50%) scale(1) rotate(0deg)`;
    // 배경화면 변경
    this.$main.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
    this.$header.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
    // 5번째 뒤에꺼 scale1로 조정
    if(this.mainAutoSlide > 4) {
      this.$mainImgBoxes[this.mainAutoSlide - 5].style.transform = `translate(-50%, -50%) scale(1) ${this.mainInitialRotate[this.mainAutoSlide  % 5]}`;
    } 
    // 진행 바 숫자 바뀌는거
    this.$mainCurrentNum.textContent = (15 - this.mainAutoSlide) < 10 ? `0${(15 - this.mainAutoSlide)}` : `${(15 - this.mainAutoSlide)}`;
    // 5초간 기다려
    new Promise((resolve) => {
      this.autoTimeout = setTimeout(() => {
        // 이미지 날려
        if(this.mainAutoSlide > 0) {
          this.$mainImgBoxes[this.mainAutoSlide].style.left = '200%';
          this.mainAutoSlide--;
          this.$mainSubTitle.textContent = `${this.mainSubTitle[this.mainAutoSlide]}`;
          this.$mainTitle.textContent = `${this.mainTitle[this.mainAutoSlide]}`;   
          resolve();
          return this.autoSlide();      
        } else if(this.mainAutoSlide === 0) {
          this.mainStackIndex = 14;
          this.mainAutoSlide = 14;
          // 배경화면 자연스럽게 변경
          this.$main.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
          this.$header.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
          this.$mainProgress.classList.remove('progress');
          resolve();
          return this.showCards();
        }
      }, 5000);
    });
  }

  // 📍 수동과 자동 믹스 어떻게?
  // 📍 기존에 자동에서 진행되던 타이머를 취소하고 새롭게 타이머 설정해야 한다. 
  clickMainPrevBtn() {
    if(this.mainAutoSlide >= 14) return;
    clearTimeout(this.autoTimeout);

    if(this.mainAutoSlide === 13) {
      // 버튼 비활성화
      this.$mainPrevBtn.classList.add('deactivated');
    }

    // 지나간 슬라이드 다시 돌아와
    this.$mainImgBoxes[this.mainAutoSlide + 1].style.left = '50%';
    // 동시에 현재 슬라이드 rotate 변화하고 뒤에서 5번째 다시 scale조정
    this.$mainImgBoxes[this.mainAutoSlide].style.transform = `translate(-50%, -50%) scale(1) ${this.mainInitialRotate[this.mainAutoSlide % 5]}`;
    // 다시 안보이게 됌
    if(this.mainAutoSlide > 4) {
      this.$mainImgBoxes[this.mainAutoSlide - 5].style.transform = `translate(-50%, -50%) ${this.mainInitialScale[this.mainAutoSlide]} ${this.mainInitialRotate[this.mainAutoSlide  % 5]}`;
    } 
    this.mainAutoSlide++;
    // 진행 바 숫자 바뀌는거
    this.$mainCurrentNum.textContent = (15 - this.mainAutoSlide ) < 10 ? `0${(15 - this.mainAutoSlide)}` : `${(15 - this.mainAutoSlide)}`;
    this.$mainSubTitle.textContent = `${this.mainSubTitle[this.mainAutoSlide]}`;
    this.$mainTitle.textContent = `${this.mainTitle[this.mainAutoSlide]}`;   
    return this.autoSlide();
  }

  clickMainNextBtn() {
    // 사진, 타이틀, 카운트 숫자, 배경화면 바꿔
    // 기존의 autoSlide 정지
    clearTimeout(this.autoTimeout);

    if(this.mainAutoSlide > 0) {
      this.$mainImgBoxes[this.mainAutoSlide].style.left = '200%';
      this.mainAutoSlide--;
      this.$mainSubTitle.textContent = `${this.mainSubTitle[this.mainAutoSlide]}`;
      this.$mainTitle.textContent = `${this.mainTitle[this.mainAutoSlide]}`;   
      return this.autoSlide();      
    } else if(this.mainAutoSlide === 0) {
      this.mainStackIndex = 14;
      this.mainAutoSlide = 14;
      // 배경화면 자연스럽게 변경
      this.$main.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
      this.$header.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
      this.$mainProgress.classList.remove('progress');
      return this.showCards();
    }
  }

  async clickMainShuffleBtn() {
    // 타이머 중지
    clearTimeout(this.autoTimeout);
    // 이미지 다 날리고
    for(let imgBox of this.$mainImgBoxes) {
      imgBox.style.left = '200%';
    }
    // 타이틀 다 날리고
    this.$mainSubTitle.textContent = ``;
    this.$mainTitle.textContent = ``;   
    this.$mainProgress.classList.remove('progress');

    this.fragment = null;
    this.randomArr = [];
    this.temTitleArr = [];
    this.temSubtitleArr = [];
    this.temBackcolorArr = [];

    // 다시 이미지 배열 순서를 다시해서
    // 0부터 14의 랜덤 숫자를 가진 length 15개의 배열
    this.makeRandom();
    // $mainImgBoxes 재배열 => 실제 DOM 요소 바꾸기
    this.arrangeShuffle();
    // 다시 등장, 
    this.mainStackIndex = 14;
    this.mainAutoSlide = 14;
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        return this.showCards();    
      }, 2500);
    })
  }

  makeRandom() {
    const number = Math.floor(Math.random() * 15);
    if(!this.randomArr.includes(number)) {
      this.randomArr = this.randomArr.concat(number);
    }
    if(this.randomArr.length === 15) {
      return;
    } else {
      this.makeRandom();
    }
  }

  arrangeShuffle() {
    this.fragment = new DocumentFragment();
    // DOM재배치, 타이틀 재배치
    for(let randomNum of this.randomArr) {
      this.fragment.append(this.$mainImgBoxes[randomNum]);
      this.temTitleArr.push(this.mainTitle[randomNum]);
      this.temSubtitleArr.push(this.mainSubTitle[randomNum]);
      this.temBackcolorArr.push(this.mainBackgroundColor[randomNum]);
    }
    for(let currentElem of this.$mainImgArea.children) {
      currentElem.remove();
    }
    this.$mainImgArea.append(this.fragment);
    this.$mainImgBoxes = Array.from(document.querySelectorAll('.main__imgs__image-box'));    
    this.mainTitle = [...this.temTitleArr];
    this.mainSubTitle = [...this.temSubtitleArr];
    this.mainBackgroundColor = [...this.temBackcolorArr];
  }

  // 📍 드래그 이벤트
  dragAndDrop(e) {
    clearTimeout(this.autoTimeout);
    this.$mainProgress.classList.remove('progress');

    this.mouseTarget = e.currentTarget;
    this.mouseTarget.style.transform = `translate(-50%, -50%) scale(1.1) rotate(0deg)`;
    this.mouseTarget.style.transition = `left 0.1s ease-out, transform 0.3s ease-out`;
    this.mouseTarget.style.cursor = `grabbing`;
    this.mouseTarget.style.zIndex = `1000`;
    this.rectX = this.mouseTarget.getBoundingClientRect().left;
    this.shiftX = e.clientX - this.rectX;

    this.moveAt(e.clientX);
    
    document.addEventListener('pointermove', this.pointerMove);
    this.mouseTarget.addEventListener('pointerup', this.pointerUp);
    this.mouseTarget.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  moveAt(clientX) {
    this.mouseTarget.style.left = `calc(50% + ${clientX - this.shiftX - this.rectX}px)`;
  }

  pointerMove(e) {
    this.moveAt(e.clientX);
  }

  pointerUp(e) {
    this.browserWidth = document.documentElement.clientWidth;
    // 오른쪽으로 움직일때와 왼쪽으로 움직일때
    // 오른쪽은 ${clientX - this.shiftX - this.rectX}의 값이 양수일때
    // 왼쪽은 ${clientX - this.shiftX - this.rectX}의 값이 음수일때
    // 오른쪽은 (right - 브라우저 너비) / 브라우저 너비가 0.3이상일때
    // 왼쪽은 (요소 너비 - right) / 브라우저 너비가 0.3이상일때
    if(e.clientX - this.shiftX - this.rectX > 0) {
      // 오른쪽
      this.ratio = (this.mouseTarget.getBoundingClientRect().right - this.browserWidth) / this.browserWidth;
      this.direction = 'right';
    } else if(e.clientX - this.shiftX - this.rectX < 0) {
      // 왼쪽
      this.ratio = (this.mouseTarget.getBoundingClientRect().width - this.mouseTarget.getBoundingClientRect().right) / this.browserWidth;
      this.direction = 'left';
    }

    // 브라우저 너비별로 다르게
    if(this.browserWidth < 600) {
      this.forPointerUp(0.2);
    } else if(this.browserWidth >= 600 && this.browserWidth < 1024) {
      this.forPointerUp(0.05);
    } else if(this.browserWidth >= 1024) {
      switch(this.direction) {
        case 'right':
          this.forPointerUp(0.1);
          break;
        case 'left': 
          this.forPointerUp(-0.35);
          break;
      }
    } 

    this.mouseTarget.style.transform = `translate(-50%, -50%) scale(1) rotate(0deg)`;
    this.mouseTarget.style.transition = `left 0.4s ease-out, transform 0.3s ease-out`;
    this.mouseTarget.style.cursor = ``;
    this.mouseTarget.style.zIndex = ``;  
    this.$mainProgress.classList.add('progress');

    document.removeEventListener('pointermove', this.pointerMove);
    this.mouseTarget.removeEventListener('pointerup', this.pointerUp);
  }

  forPointerUp(RATIO) {
    if(this.ratio >= RATIO) {
      // 넘겨
      if(this.mainAutoSlide > 0) {
        this.$mainImgBoxes[this.mainAutoSlide].style.left = '200%';
        this.mainAutoSlide--;
        this.$mainSubTitle.textContent = `${this.mainSubTitle[this.mainAutoSlide]}`;
        this.$mainTitle.textContent = `${this.mainTitle[this.mainAutoSlide]}`;   
        this.autoSlide();      
      } else if(this.mainAutoSlide === 0) {
        this.mainStackIndex = 14;
        this.mainAutoSlide = 14;
        // 배경화면 자연스럽게 변경
        this.$main.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
        this.$header.style.backgroundColor = `${this.mainBackgroundColor[this.mainAutoSlide]}`;
        this.$mainProgress.classList.remove('progress');
        this.showCards();
      }
    } else {
      this.mouseTarget.style.left = `50%`;
      this.autoSlide();
    }
  }
}

const intro = new Intro();
// intro.init();

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Events
// 📍 왜 어떤건 pointerover가 안 되고 어떤 건 pointerover가 되는지?

class Events {
  constructor() {
    this.$menuBackground = document.getElementById('menuBackground');
    this.$menuContents = document.getElementById('menuContents');
    this.$headerMenuLines = document.querySelectorAll('.header__menu__line');
    this.documentClientWidth = document.documentElement.clientWidth;

    this.$headerCateText = null;
    this.$headerCateCircle = null;

    this.$mainScrollBackground = document.querySelector('.main__bar__scroll__circle__background');
    this.$mainScrollArrow = document.querySelector('.main__bar__scroll__circle__arrow');
    this.mainScrollStart = null;
    this.mainScrollEnd = null;
    this.$mainTooltip = null;
    this.$release = document.getElementById('release');

    this.$releaseTitle = null;
    this.$releasePlay = null;

    this.$spotlightInner = document.querySelector('.spotlight__contents__inner');
    this.$spotlightItems = Array.from(document.querySelectorAll('.spotlight__contents__item'));
    this.$spotlightImgBoxImges = Array.from(document.querySelectorAll('.spotlight__contents__item__img-box__img'));
    this.$spotCursor = document.getElementById('spotlightCursor');
    this.spotInnerLeft = null;
    this.firstInnerLeft = document.querySelector('.spotlight__contents__inner').getBoundingClientRect().left;
    this.currentSpotItem = 0;
    this.currentSpotFlower = null;
    this.currentSpotTarget = null;
    this.currentSpotRead = null;
    this.spotRatio = null;
    this.spotZindex = null;

    this.$jobsArrow = document.querySelector('.jobs__arrow');
    this.$jobsEditorial = document.querySelector('.jobs__editorial');

    this.$footerScollBack = document.querySelector('.footer__scroll__contents__arrow__background');
    this.$footerScrollArrow = document.querySelector('.footer__scroll__contents__arrow__img');
    this.footerScrollStart = null;

    this.spotlightPointerMove = this.spotlightPointerMove.bind(this);
    this.spotlightPointerUp = this.spotlightPointerUp.bind(this);  
    this.spotKeydown = this.spotKeydown.bind(this);
    this.spotFlower = this.spotFlower.bind(this);
    this.leaveSpotFlower = this.leaveSpotFlower.bind(this);
    this.spotCursor = this.spotCursor.bind(this);
    this.spotCursorMoveAt = this.spotCursorMoveAt.bind(this);
    this.spotCursorMove = this.spotCursorMove.bind(this);
    this.spotCursorOut = this.spotCursorOut.bind(this);
    this.jobs = this.jobs.bind(this);

    this.$spotlightImgBoxImges.forEach(item => {
      item.addEventListener('pointerover', this.spotFlower);
    });
  }

  animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timing(timeFraction)
      draw(progress); 
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  handleEvent(event) {
    const EVENT_TYPE = event.type;
    if(EVENT_TYPE === 'resize') {
      this.resize(event);
      return;
    }
    const target = event.target.closest(`[data-${EVENT_TYPE}]`);
    if(!target) return;
    const method = target.dataset[EVENT_TYPE];
    this[method](event, target);
  }

  headerMenu(e, target) {
    // 삼지창에서 X자로
    for(let line of this.$headerMenuLines) {
      line.classList.toggle('clicked');
    }
    // 흰색 메뉴 등장
    this.$menuBackground.classList.toggle('clicked');
    this.$menuContents.classList.toggle('clicked');
    // 스크롤바 사라짐
    document.body.classList.toggle('hidden');
    // 스크롤바 사라지면서 너비가 넓어지니까 그만큼 padding 채워야
    if(document.body.classList.contains('hidden')) { // 흰색 메뉴 등장, overflow: hidden
      // 현재 넓어진 너비에서 처음 스크롤바 있을때 저장한 너비를 빼서 오른쪽 패딩으로 추가하기
      document.body.style.paddingRight = (document.documentElement.clientWidth - this.documentClientWidth) + 'px';
      this.$menuContents.style.paddingRight = (document.documentElement.clientWidth - this.documentClientWidth) + 'px';
    } else {
      document.body.style.paddingRight = '';
      this.$menuContents.style.paddingRight = '';
    }  
  }

  headerHover(e, target) {
    if(e.type === 'pointerover') {
      this.$headerCateText = target.querySelector('.header__categories__category__text');
      this.$headerCateCircle = target.querySelector('.header__categories__category__circle');
      this.$headerCateText.classList.add('overed');
      this.$headerCateCircle.classList.add('overed');
    } else if(e.type === 'pointerout') {
      this.$headerCateText.classList.remove('overed');
      this.$headerCateCircle.classList.remove('overed');
    }
  }

  resize(e) {
    this.documentClientWidth = document.documentElement.clientWidth;
    if(document.documentElement.clientWidth >= 600) {
      this.$menuBackground.classList.remove('clicked');
      this.$menuContents.classList.remove('clicked');
      document.body.classList.remove('hidden');
      for(let line of this.$headerMenuLines) {
        line.classList.remove('clicked');
      }    
      document.body.style.paddingRight = '';
      this.$menuContents.style.paddingRight = '';
    }
    // spotlight에서 현재의 요소가 가장 앞에 오게 조정
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
    this.firstInnerLeft = document.querySelector('.spotlight__contents__inner').getBoundingClientRect().left;
  }

  mainTooltips(e, target) {
    if(e.type === 'pointerover') {
      this.$mainTooltip = target.querySelector('.main__btns__tooltip');
      this.$mainTooltip.classList.add('overed');
    } else if(e.type === 'pointerout') {
      this.$mainTooltip.classList.remove('overed');
    }
  }

  scrollDown(e, target) {
    if(e.type === 'pointerover') {
      this.$mainScrollBackground.classList.add('overed');
      this.$mainScrollArrow.classList.add('overed');
    } else if(e.type === 'pointerout') {
      this.$mainScrollBackground.classList.remove('overed');
      this.$mainScrollArrow.classList.remove('overed');
    } else if(e.type === 'click') {
      this.mainScrollStart = window.pageYOffset;
      this.mainScrollEnd = this.$release.getBoundingClientRect().top + window.pageYOffset;    
      this.animate({
        duration: 300,
        timing: function linear(timeFraction) {
          return timeFraction;
        },
        draw: (progress) => {
          if(progress <= 0) return;
          window.scrollTo(0, this.mainScrollStart + (this.mainScrollEnd - this.mainScrollStart) * progress);
        }
      });    
    }
  }

  releaseBox(e, target) {
    this.$releaseTitle = target.querySelector('.release__contents__box__title');
    if(target.querySelector('.release__contents__box__play-btn')) {
      this.$releasePlay = target.querySelector('.release__contents__box__play-btn');
    }
    if(e.type === 'pointerover') {
      this.$releaseTitle.classList.add('overed');
      if(this.$releasePlay) {
        this.$releasePlay.classList.add('overed');
      }
    } else if(e.type === 'pointerout') {
      this.$releaseTitle.classList.remove('overed');
      if(this.$releasePlay) {
        this.$releasePlay.classList.remove('overed');
        this.$releasePlay = null;
      }
    }
  }
  // 📍 클릭때마다 원점으로 가는 거 고치고, 키보드와 연계해서 이어질 수 있도록
  /*
  spotShiftX는 마우스 커서와 spotlightInner의 왼쪽 모서리 사이
  spotShiftX가 동일하게 움직여야 한다.
  */
  spotlight(e, target) {
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    this.spotShiftX = e.clientX - this.spotInnerLeft;
    this.$spotlightInner.style.transition = 'none';
    // 방향을 알기 위한 포인트
    this.firstClientX = e.clientX;

    this.spotlightMoveAt(e.clientX);

    this.$spotlightInner.addEventListener('pointermove', this.spotlightPointerMove);
    this.$spotlightInner.addEventListener('pointerup', this.spotlightPointerUp);
    this.$spotlightInner.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  spotlightMoveAt(clientX) {
    this.$spotlightInner.style.marginLeft = -(this.spotShiftX  - clientX + this.firstInnerLeft) + 'px';
  }

  spotlightPointerMove(e) {
    this.spotlightMoveAt(e.clientX);
  }

  // 방향 구분, 양 끝단에서 이벤트 못하게
  spotlightPointerUp(e) {
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    // 양수면 왼쪽으로 드래그, 음수면 오른쪽으로 드래그
    if(this.firstClientX - e.clientX > 0) {
      this.spotRatio = this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().right / this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().width;
      if(this.spotRatio <= 0.5) {
        // 다음 요소로 이동
        this.currentSpotItem++;
        this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
      } else {
        // 원래 위치로
        this.$spotlightInner.style.marginLeft = this.$spotlightInner.getBoundingClientRect().left + -this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + 'px';
      }  
    } else {
      // 방향이 오른쪽으로 드래그이면
      this.spotRatio = this.$spotlightItems[this.currentSpotItem - 1].getBoundingClientRect().right / this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().width;
      if(this.spotRatio >= 0.5) {
        this.currentSpotItem--;
        this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
      } else {
        this.$spotlightInner.style.marginLeft = this.$spotlightInner.getBoundingClientRect().left + -this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + 'px';
      }
    }
    this.$spotlightInner.style.transition = '';
    this.$spotlightInner.removeEventListener('pointermove', this.spotlightPointerMove);
    this.$spotlightInner.removeEventListener('pointerup', this.spotlightPointerUp);
  }

  spotKeydown(e) {
    // 17..5 , -286.5, -519.5... 의 변화
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    if(e.key == 'ArrowRight') {
      if(this.currentSpotItem >= 11) return;
      this.currentSpotItem++;
      this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
    } else if(e.key == 'ArrowLeft') {
      if(this.currentSpotItem === 0) return;
      this.currentSpotItem--;
      this.$spotlightInner.style.marginLeft = `${-this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + this.spotInnerLeft}px`;
    }
  }

  // 📍 꽃 svg가 왼쪽의 이미지를 가리는거 => 타이틀 가리는거
  // 📍 enter과 over의 차이, enter는 잘 안되는 경우
  spotFlower(e) {
    if(e.target.className !== 'spotlight__contents__item__img-box__img') return;
    if(this.currentSpotFlower) return;
    this.currentSpotTarget = e.target;
    this.currentSpotRead = this.currentSpotTarget.nextElementSibling;
    this.spotZindex = this.currentSpotTarget.closest('.spotlight__contents__item');
    this.spotZindex.style.zIndex = '0';
    this.currentSpotFlower = this.currentSpotTarget.parentNode.querySelector('.spotlight__contents__item__img-box__svg');
    this.currentSpotFlower.classList.add('bloom');
    this.currentSpotRead.classList.add('show');
    for(let child of this.currentSpotRead.children) {
      child.classList.add('show');
    }
    // 마우스 커서 모양 변형
    // this.$spotCursor.classList.add('overed');
    this.currentSpotTarget.addEventListener('pointerout', this.leaveSpotFlower);
  }

  leaveSpotFlower(e) {
    this.spotZindex.style.zIndex = '';
    this.currentSpotFlower.classList.remove('bloom');
    this.currentSpotRead.classList.remove('show');
    for(let child of this.currentSpotRead.children) {
      child.classList.remove('show');
    }
    // this.$spotCursor.classList.remove('overed');
    this.currentSpotTarget.removeEventListener('pointerout', this.leaveSpotFlower);
    this.currentSpotFlower = null;
  }

  spotCursor(e) {
    // 완전체로 등장
    this.$spotCursor.style.display = 'flex';
    console.log(e.target, e.type, this.$spotCursor, e.clientX, e.clientY);

    this.spotCursorMoveAt(e.clientX, e.clientY);

    this.$spotlightInner.addEventListener('pointermove', this.spotCursorMove);
    this.$spotlightInner.addEventListener('pointerout', this.spotCursorOut);
  }

  spotCursorMoveAt(clientX, clientY) {
    this.$spotCursor.style.left = clientX - (this.$spotCursor.getBoundingClientRect().width / 2) + 'px';
    this.$spotCursor.style.top = clientY - (this.$spotCursor.getBoundingClientRect().height / 2) + 'px';
  }

  spotCursorMove(e) {
    this.spotCursorMoveAt(e.clientX, e.clientY);
  }

  spotCursorOut() {
    this.$spotCursor.style.display = 'none';
  }

  jobs(e) {
    if(e.type === 'pointerover') {
      this.$jobsArrow.classList.add('show');
      this.$jobsEditorial.classList.add('show');
    } else if(e.type === 'pointerout') {
      this.$jobsArrow.classList.remove('show');
      this.$jobsEditorial.classList.remove('show');
    }
  }

  backToTop(e, target) {
    if(e.type === 'pointerover') {
      this.$footerScollBack.classList.add('overed');
      this.$footerScrollArrow.classList.add('overed');
    } else if(e.type === 'pointerout') {
      this.$footerScollBack.classList.remove('overed');
      this.$footerScrollArrow.classList.remove('overed');
    } else if(e.type === 'click') {
      this.footerScrollStart = window.pageYOffset;

      this.animate({
        duration: 400,
        timing: function quad(timeFraction) {
          return Math.pow(timeFraction, 2)
        },
        draw: (progress) => {
          if(progress <= 0) return;
          window.scrollTo(0, this.footerScrollStart * (1 - progress));
        }    
      });
    }
  }
}

const events = new Events();
document.addEventListener('click', events);
document.addEventListener('pointerover', events);
document.addEventListener('pointerout', events);
document.addEventListener('pointerdown', events);
document.addEventListener('keydown', events.spotKeydown);
window.addEventListener('resize', events);

class InboxScroll {
  constructor() {
    this.$inbox = document.getElementById('inbox');
    this.$inboxSvgCircle1 = document.querySelector('.inbox__svg__circle__path1');
    this.$inboxSvgCircle2 = document.querySelector('.inbox__svg__circle__path2');
    this.$inboxSvgArrowHead = document.querySelector('.inbox__svg__arrow__head');
    this.$inboxSvgArrowBody = document.querySelector('.inbox__svg__arrow__body');
    this.circle1Length = this.$inboxSvgCircle1.getTotalLength(); // 245
    this.circle2Length = this.$inboxSvgCircle2.getTotalLength(); // 295
    this.headLength = this.$inboxSvgArrowHead.getTotalLength(); // 49
    this.bodyLength = this.$inboxSvgArrowBody.getTotalLength(); // 196
    this.ratio = null;

    this.inbox = this.inbox.bind(this);
  }

  inbox(e) {
    this.ratio = (window.pageYOffset + document.documentElement.clientHeight - this.$inbox.offsetTop) / this.$inbox.offsetHeight;
    if(this.ratio >= 0.43 && this.ratio < 1.8) {
      this.$inboxSvgCircle1.classList.add('show');
      this.$inboxSvgCircle2.classList.add('show');
      this.$inboxSvgArrowHead.classList.add('show');
      this.$inboxSvgArrowBody.classList.add('show');
    } else if(this.ratio >= 1.8 || this.ratio < 0.43) {
      this.$inboxSvgCircle1.classList.remove('show');
      this.$inboxSvgCircle2.classList.remove('show');
      this.$inboxSvgArrowHead.classList.remove('show');
      this.$inboxSvgArrowBody.classList.remove('show');
    }
  }
}

const inboxScroll = new InboxScroll();
window.addEventListener('scroll', inboxScroll.inbox);

class Time {
  constructor() {
    this.$hours = document.querySelectorAll('.time__clock__hour');
    this.$minutes = document.querySelectorAll('.time__clock__minute');
    this.$seconds = document.querySelectorAll('.time__clock__second');
  }

  init(string, timezone, index) {
    const date = new Date().toLocaleString(string, {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    
    const timeComponents = date.split(':');

    let hour = parseInt(timeComponents[0]);
    if(hour < 10) hour = '0' + hour;
    this.$hours[index].innerHTML = hour;

    let minute = parseInt(timeComponents[1]);
    if(minute < 10) minute = '0' + minute;
    this.$minutes[index].innerHTML = minute;

    let second = parseInt(timeComponents[2]);
    if(second < 10) second = '0' + second;
    this.$seconds[index].innerHTML = second;
  }

  time() {
    this.init('en-US', 'Europe/Stockholm', 0);
    this.init('en-GB', 'Europe/London', 1);
    this.init('en-US', 'America/New_York', 2);
  }
}

const time = new Time();
time.time();
setInterval(() => {
  time.time();
}, 1000)

// git push -u origin main

