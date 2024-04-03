// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// INTRO + MAIN

class Intro {
  constructor() {
    this.$introLogo = document.querySelector('.intro-logo');
    this.$introFlower = document.querySelector('.intro-flower');
    this.introFlowerWidth = null;

    this.$header = document.getElementById('header');
    this.$main = document.getElementById('main');

    this.$mainImgBoxes = document.querySelectorAll('.main__imgs__image-box');
    this.mainStackIndex = 14;

    this.animate = this.animate.bind(this);
    this.showFlower = this.showFlower.bind(this);
    this.disappearLogoAndFlower = this.disappearLogoAndFlower.bind(this);
    this.showCards = this.showCards.bind(this);
    this.autoSlide = this.autoSlide.bind(this);
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
    // document.body.style.overflowY = 'hidden';
    // setTimeout(this.showFlower, 1500);
    // setTimeout(this.disappearLogoAndFlower, 4500);
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
    // this.showCards();
  }

  async showCards() {
    let intervalId = setInterval(() => {
      [...this.$mainImgBoxes][this.mainStackIndex].classList.add('stacked');
      this.mainStackIndex--;

      if(this.mainStackIndex < 0) {
        clearInterval(intervalId);
        // 마지막 imgBox까지 중앙으로 들어왔을때 (transition: left 0.4s라서)
        // 자동 슬라이드 시작
        new Promise((resolve) => {
          setTimeout(() => {
            this.autoSlide();
            resolve();
          }, 400);
        })    
      }
    }, 40);
  }

  autoSlide() {

  }
}

const intro = new Intro();
intro.init();
intro.showCards();

const mainSubjects = [
  "BEHIND THE SCENES",
  "Q+A",
  "BEHIND THE SCENES",
  "METHODS",
  "DESIGN SYSTEMS",
  "BEHIND THE SCENES",
  "PRODUCT DESIGN",
  "PRODUCT DESIGN",
  "BEHIND THE SCENES",
  "DESIGN OPS",
  "PRODUCT DESIGN",
  "BEHIND THE SCENES",
  "BEHIND THE SCENES",
  "Q+A",
  "PRODUCT DESIGN"
];

const mainTitles = [
  "Collaboration Secrets: Design X Engineering",
  "Ask Spotify Design 07",
  "Making Moves: Designing Motion for 2022 Wrapped",
  "Navigating the Discovery Phase",
  "Can I get an Encore? Spotify’s Design System, Three Years On",
  "From Web Page to Web Player: How Spotify Designed a New Homepage Experience",
  "Designing for the World: An Introduction to Localization",
  "Finding your T-Shape as a Specialist Designer",
  "Backstage Tickets to the World of Service Design at Spotify",
  "Growing, Scaling, and Tuning: Meet Spotify’s Global Head of Design Ops",
  "Finding your T-Shape as a Generalist Designer",
  "A Designer's Balancing Act: Staying Creative and Organized in Figma",
  "How to Stand Out as a Spotify Internship Applicant",
  "Ask Spotify Design 06",
  'Beyond "Good Job": How to Give Impactful Feedback'
];

const backgroundColorBlue = '#a4c8d7';
const backgroundColorOrange = '#fcba4a';

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
}

const events = new Events();
document.addEventListener('click', events);
document.addEventListener('pointerover', events);
document.addEventListener('pointerout', events);
window.addEventListener('resize', events);

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


// git push -u origin main
// ----------------------------------------------------------------------------------
// SPOTLIGHT
/*
translate3d는 항상 어디에서 어디 가는지를 명시해줘야 자연스럽게 되지, 
안 그럼 0, 0에서 출발
예를 들면 -452에서 -700을 가려면 -452에서 -700가는 걸 명시해줘야지, 그냥 띡하니 -700하면 0에서 -700으로 출발한다.
*/
const $spotlightScrollItem = document.querySelectorAll('.js-spotlight__scroll__item');
const $spotlightScrollInner = document.querySelector('.js-spotlight__scroll__inner');
const $spotlightImg = document.querySelectorAll('.js-spotlight__scroll__item__img-box__img');

document.ondragstart = () => {
  return false;
}

let spotlightCount = 0;
let currentOffsetLeft = 0;

// 키보드 
document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowRight') {
    if(spotlightCount >= 10) return;

    const rightGoalOffsetLeft = $spotlightScrollItem[spotlightCount + 1].offsetLeft; // 양수
    const neededValue = currentOffsetLeft - rightGoalOffsetLeft; // 음수
    
    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        // progress가 음수일 수도 있다.
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + neededValue * progress}px, 0px, 0px)`;
        if(progress >= 1) {
          spotlightCount++;
          currentOffsetLeft = rightGoalOffsetLeft;
        } 
      }
    });
  }

  if(e.key == 'ArrowLeft') {
    if(spotlightCount <= 0) return;

    const leftGoalOffsetLeft = $spotlightScrollItem[spotlightCount - 1].offsetLeft; // 양수
    const neededValue = leftGoalOffsetLeft - currentOffsetLeft; // 음수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-leftGoalOffsetLeft + (neededValue * (1 - progress))}px, 0px, 0px)`;
        if(progress >= 1) {
          spotlightCount--;
          currentOffsetLeft = leftGoalOffsetLeft;
        } 
      }
    });
  }
});

// 사이즈 새로고침 했을 때 끝에서부터 반복되는거? -> 
// 브라우저 사이즈가 변경될 때마다 예를 들어 $spotlightScrollItem[1].offsetLeft의 값이 364, 424, 696으로 바뀌기 때문에 
// 현재 기준으로 currentOffsetLeft을 계산해야 한다. 
window.addEventListener('resize', () => {
  currentOffsetLeft = $spotlightScrollItem[spotlightCount].offsetLeft;
  $spotlightScrollInner.style.transform = `translate3d(${-$spotlightScrollItem[spotlightCount].offsetLeft}px, 0px, 0px)`;
});

let currentElem = null;
let svgElem;
let readElem;
let readElemText; 
let readElemMore;

$spotlightScrollInner.addEventListener('pointerover', async (e) => {
  if(currentElem) return;
  if(e.target.className !== 'js-spotlight__scroll__item__img-box__img') return;
  currentElem = e.target;

  svgElem = currentElem.parentNode.lastElementChild;
  readElem = currentElem.parentNode.querySelector('.spotlight__scroll__item__img-box__read');
  readElemText = readElem.querySelector('.spotlight__scroll__item__img-box__read__text');
  readElemMore = readElem.querySelector('.spotlight__scroll__item__img-box__read__more');

  svgElem.classList.add('bloom');
  readElem.classList.add('show');

  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  });

  readElemText.classList.add('show');

  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  });

  readElemMore.classList.add('show');
});

$spotlightScrollInner.addEventListener('pointerout', async (e) => {
  if (!currentElem) return;

  svgElem.classList.replace('bloom', 'shrink');
  readElem.classList.remove('show');
  readElemText.classList.remove('show');
  readElemMore.classList.remove('show');

  currentElem = null;

  await new Promise(resolve => {
    setTimeout(() => {
      svgElem.classList.remove('shrink');
      resolve();
    }, 1000);
  });
});

const $spotlightCursor = document.querySelector('.js-spotlight-cursor');
const $spotlightCursorCircle = document.querySelector('.js-spotlight-cursor__circle');

// 마우스 커서
$spotlightScrollInner.addEventListener('pointerover', (e) => {
  $spotlightScrollInner.appendChild($spotlightCursor);
  $spotlightCursor.className = 'js-spotlight-cursor show';

  const imgClassList = e.target.className;

  if(imgClassList === 'js-spotlight__scroll__item__img-box__img') {
    $spotlightCursor.className = 'js-spotlight-cursor show scale';
    $spotlightCursorCircle.className = 'js-spotlight-cursor__circle scale';
  }

  $spotlightScrollInner.addEventListener('pointermove', (e) => {
    const topOfCursor = e.clientY - $spotlightScrollInner.getBoundingClientRect().top - ($spotlightCursor.offsetHeight / 2);
    const leftOfCursor = e.clientX - $spotlightScrollInner.getBoundingClientRect().left - ($spotlightCursor.offsetWidth / 2);

    $spotlightCursor.style.top = topOfCursor + 'px';
    $spotlightCursor.style.left = leftOfCursor + 'px'; 
  });

  $spotlightScrollInner.addEventListener('pointerout', (e) => {
    $spotlightCursor.className = 'js-spotlight-cursor';

    if(imgClassList === 'js-spotlight__scroll__item__img-box__img') {
      $spotlightCursor.className = 'js-spotlight-cursor show';
      $spotlightCursorCircle.className = 'js-spotlight-cursor__circle';
    }  
  })
});

let firstPointerDown;
let xValue;

// 드래그 앤 드롭
$spotlightScrollInner.addEventListener('pointerdown', (e) => {

  $spotlightCursor.classList.add('pointerdown');
  $spotlightCursorCircle.className = 'js-spotlight-cursor__circle scale';


  firstPointerDown = 0;
  xValue = 0;
  firstPointerDown = e.clientX - xValue;
  console.log(
    ['pointerdown'],
    ['firstPointerDown', firstPointerDown],
    ['e.clientX', e.clientX],
    ['xValue', xValue]
  );
  // 슬라이드가 드래그 되는 효과
  $spotlightScrollInner.addEventListener('pointermove', moveEvent);
});

$spotlightScrollInner.addEventListener('pointerup', () => {

  $spotlightCursor.classList.remove('pointerdown');
  $spotlightCursorCircle.className = 'js-spotlight-cursor__circle';
  
  $spotlightScrollInner.removeEventListener('pointermove', moveEvent);

  // 슬라이드가 튕기거나 혹은 다음 이미지로 움직이거나
  bounceEvent();
});


function moveEvent(e) {
  // xValue는 왼쪽으로 드래그 할때는 음수, 오른쪽으로 드래그 할 때는 양수
  xValue = e.clientX - firstPointerDown;
  console.log(
    ['moveEvent'],
    ['xValue', xValue],
    ['e.clientX', e.clientX],
    ['firstPointerDown', firstPointerDown],
    ['currentOffsetLeft', currentOffsetLeft],
    ['-currentOffsetLeft + xValue', -currentOffsetLeft + xValue]
  );
  // 왼쪽 오른쪽 둘 다 적용
  $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue}px, 0px, 0px)`;
}

function bounceEvent() {
  const standard = $spotlightScrollItem[spotlightCount+1].getBoundingClientRect().left - $spotlightScrollItem[spotlightCount].getBoundingClientRect().right;
  const absolutexValue = Math.abs(xValue);

  if(absolutexValue < standard * 2.5 || spotlightCount == 0 || spotlightCount == 10) {
      animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        // 왼쪽 오른쪽 둘 다 적용, xValue가 소멸하면서 원래 자리로 돌아오는 효과

        console.log(
          ['튕길 때'],
          ['xValue', xValue],
          ['currentOffsetLeft', currentOffsetLeft],
          ['-currentOffsetLeft +  xValue * (1 - progress)', -currentOffsetLeft +  xValue * (1 - progress)]
        );
    
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft +  xValue * (1 - progress)}px, 0px, 0px)`;
      }
    });

  } 

  // 왼쪽으로 드래그
  if(absolutexValue >= standard * 2.5 && xValue < 0) {

    if(spotlightCount == 10) return;

    const nextImgOffsetLeft = $spotlightScrollItem[spotlightCount + 1].offsetLeft; // 양수
    const neededValue = nextImgOffsetLeft + (-currentOffsetLeft + xValue); // 양수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        console.log(
          ['다음 이미지로, 왼쪽'],
          ['xValue', xValue],
          ['neededValue', neededValue],
          ['nextImgOffsetLeft', nextImgOffsetLeft],
          ['-currentOffsetLeft + xValue + -neededValue * progress', -currentOffsetLeft + xValue + -neededValue * progress]
        );
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue + -neededValue * progress}px, 0px, 0px)`;

        if(progress >= 1) {
          spotlightCount++;
          currentOffsetLeft = nextImgOffsetLeft;      
        }
      }
    });
  }

  // 오른쪽으로 드래그
  if(absolutexValue >= standard * 2.5 && xValue > 0) {

    if(spotlightCount == 0) return;
    const beforeImgOffsetLeft = $spotlightScrollItem[spotlightCount - 1].offsetLeft; // 양수
    const neededValue = currentOffsetLeft - xValue - beforeImgOffsetLeft; // 양수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        console.log(
          ['다음 이미지로, 오른쪽'],
          ['xValue', xValue],
          ['neededValue', neededValue],
          ['beforeImgOffsetLeft', beforeImgOffsetLeft],
          ['-currentOffsetLeft + xValue + neededValue * progress', -currentOffsetLeft + xValue + neededValue * progress]
        );

        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue + neededValue * progress}px, 0px, 0px)`;

        if(progress >= 1) {
          spotlightCount--;
          currentOffsetLeft = beforeImgOffsetLeft;      
        }
      }
    });
  }
}


// ----------------------------------------------------------------------------------
// INBOX


const $inbox = document.querySelector('.js-inbox');
const $inboxSvgCirclePath1 = document.querySelector('.js-inbox__title__text-box__svg-circle__path1');
const $inboxSvgCirclePath2 = document.querySelector('.js-inbox__title__text-box__svg-circle__path2');
const $inboxSvgCirclePath1_lenghth = $inboxSvgCirclePath1.getTotalLength(); // 244.7532196044922
const $inboxSvgCirclePath2_length = $inboxSvgCirclePath2.getTotalLength(); // 294.6005859375
const $inboxSvgArrowPath1 = document.querySelector('.js-inbox__title__svg-arrow__path1');
const $inboxSvgArrowPath2 = document.querySelector('.js-inbox__title__svg-arrow__path2');
const $inboxSvgArrowPath1_length = $inboxSvgArrowPath1.getTotalLength(); // 48.15165710449219
const $inboxSvgArrowPath2_length = $inboxSvgArrowPath2.getTotalLength(); // 195.17434692382812

/*
window.pageYOffset: 세로 스크롤에 의해 가려진 위쪽 영역 높이
window.innerHeight: 전체 창 너비
document.documentElement.clientHeight: 스크롤바가 차지하는 영역을 제외한 창 너비
*/

document.addEventListener('scroll', () => {
  const ratio = (window.pageYOffset + document.documentElement.clientHeight - ($inbox.getBoundingClientRect().top + window.pageYOffset)) / $inbox.offsetHeight;

  if (ratio >= 0.4 && ratio < 1.15) {
    $inboxSvgCirclePath1.classList.add('active');
    $inboxSvgCirclePath2.classList.add('active');
    $inboxSvgArrowPath1.classList.add('active');
    $inboxSvgArrowPath2.classList.add('active');
  } else if (ratio <= 0.3 || ratio >= 1.17) {
    $inboxSvgCirclePath1.classList.remove('active');
    $inboxSvgCirclePath2.classList.remove('active');
    $inboxSvgArrowPath1.classList.remove('active');
    $inboxSvgArrowPath2.classList.remove('active');
  }
})


// ----------------------------------------------------------------------------------
// JOBS

const $toolsImgBoxes = document.querySelectorAll('.js-tools__img-box');

[...$toolsImgBoxes].forEach(imgBox => {
  let title;

  imgBox.addEventListener('pointerenter', () => {
    title = imgBox.querySelector('.js-img-box__title');
    title.classList.add('--underline');
  });

  imgBox.addEventListener('pointerleave', () => {
    title.classList.remove('--underline');
  });
});

const $jobs = document.querySelector('.js-jobs');
const $jobsMiamiArrow = document.querySelector('.js-jobs__miami__arrow');
const $jobsMiamiArrowCircle = document.querySelector('.js-jobs__miami__arrow__circle');
const $jobsMiamiArrowCircleArrow = document.querySelector('.js-jobs__miami__arrow__circle__arrow');
const $jobsEditorial = document.querySelector('.js-jobs__editorial');

$jobs.addEventListener('mouseenter', () => {
  jobsAdd($jobsMiamiArrow, $jobsMiamiArrowCircle, $jobsMiamiArrowCircleArrow, $jobsEditorial)
});

$jobs.addEventListener('mouseleave', () => {
  jobsRemove($jobsMiamiArrow, $jobsMiamiArrowCircle, $jobsMiamiArrowCircleArrow, $jobsEditorial)
});

function jobsAdd(item1, item2, item3, item4) {
  item1.classList.add('hover');
  item2.classList.add('hover');
  item3.classList.add('hover');
  item4.classList.add('hover');
}

function jobsRemove(item1, item2, item3, item4) {
  item1.classList.remove('hover');
  item2.classList.remove('hover');
  item3.classList.remove('hover');
  item4.classList.remove('hover');
}

// ----------------------------------------------------------------------------------
// TIME
// SE -> UK -> US
const $hours = document.querySelectorAll('.js-time__main-box__times__time__clock__hour');
const $mins = document.querySelectorAll('.js-time__main-box__times__time__clock__minute');
const $secs = document.querySelectorAll('.js-time__main-box__times__time__clock__second');

function setTime(string, timezone, number) {
  let date = new Date().toLocaleString(string, {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const timeComponents = date.split(':');
  let hour = parseInt(timeComponents[0]);
  if(hour < 10) hour = '0' + hour;
  $hours[number].innerHTML = hour;

  let minute = parseInt(timeComponents[1]);
  if (minute < 10) minute = '0' + minute;
  $mins[number].innerHTML = minute;

  let second = parseInt(timeComponents[2]);
  if (second < 10) second = '0' + second;
  $secs[number].innerHTML = second;
}

setTime('en-US', 'Europe/Stockholm', 0);
setTime('en-GB', 'Europe/London', 1);
setTime('en-US', 'America/New_York', 2);

setInterval(() => {
  setTime('en-US', 'Europe/Stockholm', 0)
  setTime('en-GB', 'Europe/London', 1)
  setTime('en-US', 'America/New_York', 2)
},  1000)

// ----------------------------------------------------------------------------------
// FOOTER

const $backToTopContents = document.querySelector('.js-footer__back-to-top__contents');
const $backToTopContentsArrow = document.querySelector('.js-footer__back-to-top__contents__arrow');
const $backToTopContentsArrowImg = document.querySelector('.js-footer__back-to-top__contents__arrow_img');

$backToTopContents.onclick = () => {
  const start = window.pageYOffset; 

  animate({
    duration: 400,
    timing: function quad(timeFraction) {
      return Math.pow(timeFraction, 2)
    },
    draw: function(progress) {
      window.scrollTo(0, start * (1 - progress));
    }
  });
}

$backToTopContents.addEventListener('pointerenter', () => {
  $backToTopContentsArrow.classList.toggle('hover');
  $backToTopContentsArrowImg.classList.toggle('hover');
});

$backToTopContents.addEventListener('pointerleave', () => {
  $backToTopContentsArrow.classList.toggle('hover');
  $backToTopContentsArrowImg.classList.toggle('hover');
});


function animate({timing, draw, duration}) {

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
