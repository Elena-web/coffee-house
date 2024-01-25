// Модальное окно
const modalIcon = document.querySelector('.modal-icon');
const modal = document.querySelector('.modal');

modalIcon.addEventListener('click', function () {
	this.classList.toggle('modal-icon--active');
	modal.classList.toggle('modal--active');
	document.body.style.overflow = "hidden";
});

// Закрытие модального окна по нажатию на ссылку
const modalLinks = document.querySelectorAll('.modal');

modalLinks.forEach(function (item) {
  item.addEventListener('click', function () {
    modalIcon.classList.remove('modal-icon--active');
    modal.classList.remove('modal--active');
  });
});

modal.addEventListener('transitionend', function () {
  if (!modal.classList.contains('modal--active')) {
    document.body.style.overflow = "auto";
  }
});

const modalBtn = document.querySelector('.modal__btn');
modalBtn.addEventListener('click', function () {
    modalIcon.classList.remove('modal-icon--active');
    modal.classList.remove('modal--active');
  });

// Slider
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const sliderRow = document.querySelector('.slider__row');
const nextItem = document.querySelectorAll('.slider__item');
const pagination = document.querySelectorAll('.pagination__item');
let paginationIndex = 0;
let count = 0;
let width;

function init() {
  console.log('resize');
  width = document.querySelector('.slider__wrap').offsetWidth;
  sliderRow.style.width = width * nextItem.length + 'px';
  nextItem.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  sliderItem();
}
window.addEventListener('resize', init);
init();

// Перелистывание слайдера
let intervalId = setInterval(nextSlide, 5000);

prevBtn.addEventListener('click', function () {
  clearInterval(intervalId);
  count--;
  paginationIndex--;
  if (count < 0) {
    count = nextItem.length - 1;
    paginationIndex = nextItem.length - 1;
  }
  sliderItem();
  paginationItem(paginationIndex);
  intervalId = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('click', function () {
  clearInterval(intervalId);
  count++;
  paginationIndex++;
  if (count >= nextItem.length) {
    count = 0;
    paginationIndex = 0;
  }
  sliderItem();
  paginationItem(paginationIndex);
  intervalId = setInterval(nextSlide, 5000);
});

function nextSlide() {
  count++;
  paginationIndex++;
  if (count >= nextItem.length) {
    count = 0;
    paginationIndex = 0;
  }
  sliderItem();
  paginationItem(paginationIndex);
}

function sliderItem() {
  sliderRow.style.transform = 'translate(-' + count * width + 'px)';
}

// Активный paginationItem
const paginationItem = (index) => {
  for (let item of pagination) {
    item.classList.remove('item--active');
  }
  pagination[index].classList.add('item--active');
}

// Swipe for mobile
document.addEventListener('touchstart', startTouch, false);
document.addEventListener('touchmove', swipeTouch, false);
const swipeBlock = document.querySelector('.slider__row') 
let x = null;
function startTouch(event) {
  const firstTouch = event.touches[0];
  x = firstTouch.clientX;
}
function swipeTouch(event) {
  if (!x) {
    return false;
  }
  let x1 = event.touches[0].clientX;
  let res = x1 - x;
  x = null;
  function swipe() {
    if (res > 0) {
      count--;
      paginationIndex--;
      if (count < 0) {
        count = nextItem.length - 1;
        paginationIndex = nextItem.length - 1;
      }
    } else {
      count++;
      paginationIndex++;
      if (count >= nextItem.length) {
        count = 0;
        paginationIndex = 0;
      }
    }
    sliderItem();
    paginationItem(paginationIndex);
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
  }
  swipe();
};





