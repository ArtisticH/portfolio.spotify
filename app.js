// 새로고침

window.addEventListener('beforeunload', () => {
  window.scrollTo(0,0);
});

// INTRO

let mainimg_containers = document.querySelectorAll('.mainimg_container');
let index = 15;
let i = 0;


document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    introFlower.style.display = 'block';
  }, 1500);

  [...mainimg_containers].forEach(item => {
     item.style.zIndex = `${index}`;
     index--;
   })

  setTimeout(() => {
    let flowerWidth = introFlower.offsetWidth;

    animate({
      duration: 200,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        introFlower.style.left = -(flowerWidth * progress) + 'px';
        // 118% -> 10% 로 width 변경
        introFlower.style.width = 118 - (118 - 10) * progress + '%';
      }
    })

    introLogo.remove();
    titleMain.style.opacity = '1';
    shuffleMain.style.opacity = '1';
    progressAndScroll.style.opacity = '1';

    let intervalId = setInterval(() => {

       [...mainimg_containers][i].classList.add('stack');
       i++;

       if (i >= mainimg_containers.length) {
         clearInterval(intervalId);
         forflex.classList.add('active');
         document.body.style.overflowY = 'auto';
       }

    }, 30);
  }, 4000);
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

// ----------------------------------------------------------------------------------
// HEADER

const triFirst = document.querySelector('.triangle.first');
const triSec = document.querySelector('.triangle.second');
const triThird = document.querySelector('.triangle.third');

menuTriangle.onclick = () => {
  triFirst.classList.toggle('active');
  triSec.classList.toggle('active');
  triThird.classList.toggle('active');
};

const $menuFour = document.querySelectorAll('.menuFour');
const $menuFourCircle = document.querySelector('.menuFour_circle');
const $menuFourTitle = document.querySelector('.menuFour_title');

[...$menuFour].forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.menuFour_circle').classList.toggle('hover');
    item.querySelector('.menuFour_title').classList.toggle('hover');
  });

  item.addEventListener('mouseleave', () => {
    item.querySelector('.menuFour_circle').classList.toggle('hover');
    item.querySelector('.menuFour_title').classList.toggle('hover');
  });

})
// ----------------------------------------------------------------------------------
// MAIN

scrollMain.onclick = () => {
  const start = window.pageYOffset; 
  const end = release.getBoundingClientRect().top + window.pageYOffset; 

  animate({
    duration: 400,
    timing: function quad(timeFraction) {
      return Math.pow(timeFraction, 2)
    },
    draw: function(progress) {
      window.scrollTo(0, start + (end - start) * progress);
    }
  });
}

const $downArrow = document.querySelector('.down_arrow');

scrollMain.addEventListener('mouseenter', () => {
  scrollArrow.classList.toggle('hover');
  $downArrow.classList.toggle('hover');
});

scrollMain.addEventListener('mouseleave', () => {
  scrollArrow.classList.toggle('hover');
  $downArrow.classList.toggle('hover');
});


// ----------------------------------------------------------------------------------
// SEC 1 - RELEASE

const $imgBox = document.querySelectorAll('.imgBox');

[...$imgBox].forEach(item => {
  item.addEventListener('mouseenter', () => {
    const $topic = item.querySelector('.img_topic');
    $topic.classList.add('hover');

    if(item.firstElementChild.id === 'forPlaySvg') {
      const $play = item.querySelector('#playLoc');
      $play.classList.add('hover');
    }
  });

  item.addEventListener('mouseleave', () => {
    const $topic = item.querySelector('.img_topic');
    $topic.classList.remove('hover');

    if(item.firstElementChild.id === 'forPlaySvg') {
      const $play = item.querySelector('#playLoc');
      $play.classList.remove('hover');
    }
  });
});


const $hoverArea = document.querySelectorAll('.rightArrow_loc');

[...$hoverArea].forEach(item => {
  item.addEventListener('mouseenter', () => {
    const $firstLine = item.querySelector('.rightArrow_loc_title');
    const $backBlack = item.querySelector('.rightArrow_loc_circle');
    const $invert = item.querySelector('.rightArrow_loc_arrow');
    const $secondLine = item.querySelector('.rightArrow_loc_line');

    $firstLine.classList.add('hover');
    $backBlack.classList.add('hover');
    $invert.classList.add('hover');
    $secondLine.classList.add('hover');
  });

  item.addEventListener('mouseleave', () => {
    const $firstLine = item.querySelector('.rightArrow_loc_title');
    const $backBlack = item.querySelector('.rightArrow_loc_circle');
    const $invert = item.querySelector('.rightArrow_loc_arrow');
    const $secondLine = item.querySelector('.rightArrow_loc_line');

    $firstLine.classList.remove('hover');
    $backBlack.classList.remove('hover');
    $invert.classList.remove('hover');
    $secondLine.classList.replace('hover', 'rewind');

    // 왜 타이머 함수의 delay를 300으로 맞춰야 할까?
    /* hover out 시 
      transition: 0.3s ease-in-out;
      2초 동안 효과가 나타나고 
      그 다음에 바로 'rewind' 사라지기 위해서
    */
    setTimeout(() => {
      $secondLine.classList.remove('rewind');
    }, 300);
  });
});


// ----------------------------------------------------------------------------------
// SEC 2 - SPOTLIGHT

// ----------------------------------------------------------------------------------
// SEC 5 - JOBS


jobs_rols.addEventListener('mouseenter', () => {
  miami_arrow_container.classList.toggle('hover');
  miami_arrow_circle.classList.toggle('hover');
  miami_arrow.classList.toggle('hover');
  jobs_editorial.classList.toggle('hover');
});

jobs_rols.addEventListener('mouseleave', () => {
  miami_arrow_container.classList.toggle('hover');
  miami_arrow_circle.classList.toggle('hover');
  miami_arrow.classList.toggle('hover');
  jobs_editorial.classList.toggle('hover');
});

/*
git remote add origin https://github.com/ArtisticH/Spotify-Clone.git
git branch -M main
git push -u origin main
*/