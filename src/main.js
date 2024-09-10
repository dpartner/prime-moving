import toogleMobMenu from './js/mob-menu';
import shownFaqAnswer from './js/faq';
import { handleSelect } from './js/select';
import { handleGallery, handleGallerySwipe } from './js/exp-gallery';
// import { addGalleryImg, GalleryLibrary } from './js/add-gallery';
import showPolicy from './js/policy';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Render dynamyc elements
// document.querySelector('.experience-gallery-list').innerHTML =
//   addGalleryImg(GalleryLibrary);

// console.log(addGalleryImg(GalleryLibrary));

showPolicy();

const domElements = {
  mobMenuButton: document.querySelector('.mob-menu-button'),
  mobMenu: document.querySelector('.mobile-menu'),
  faqList: document.querySelector('.faq-list'),
  faqAnswer: document.querySelectorAll('.faq-list-item-answer'),
  modalBackDrop: document.querySelector('.modal-backdrop'),
  modalForm: document.querySelector('.modal-form'),
  modalCloseButton: document.querySelector('.modal-close-button'),
  modalServiceSelect: document.querySelector('[data-listname="service"]'),
  modalRequirementSelect: document.querySelector(
    '[data-listname="requirement"]'
  ),
  expGalleryButtonsWrap: document.querySelector('.gallery-arrow-wrap'),
  expGalleryList: document.querySelector('.experience-gallery-list'),
  expGalleryItem: document.querySelector('.experience-gallery-item'),
  expGalleryNumberItem: document.querySelector('[data-gallery="count"]'),
  expGalleryNumberLength: document.querySelector('[data-gallery="length"]'),
};

// Open Mobile Menu
domElements.mobMenuButton.addEventListener('click', () => {
  toogleMobMenu(domElements);
});

// FAQ open answers handle
domElements.faqList.addEventListener('click', ev => {
  shownFaqAnswer(ev, domElements);
});

// Custom select handle
domElements.modalForm.addEventListener('click', ev => {
  if (ev.target.dataset.type === 'customSelect') {
    const listName = ev.target.name;
    handleSelect(ev, listName);
  } else {
    domElements.modalServiceSelect.classList.remove('is-show');
    domElements.modalRequirementSelect.classList.remove('is-show');
  }
});

// Close Modal form
domElements.modalCloseButton.addEventListener('click', () =>
  domElements.modalBackDrop.classList.add('is-hidden')
);

// Open Modal form
document.querySelector('body').addEventListener('click', ev => {
  if (ev.target.dataset.set === 'open-modal') {
    domElements.modalBackDrop.classList.remove('is-hidden');
  }
});

// Adding custom calendar in Modal Form
flatpickr('#date', {
  position: 'below center',
  onChange: function (selectedDates, dateStr, instance) {
    console.log(dateStr);
  },
  minDate: Date.now(),
  static: true,
  disableMobile: true,
});

// Experiense section gallery handle
domElements.expGalleryNumberLength.textContent =
  domElements.expGalleryList.children.length;

let galleryItemCount = 0;
domElements.expGalleryButtonsWrap.addEventListener('click', ev => {
  galleryItemCount = handleGallery(ev, domElements, galleryItemCount);
});

// Swipe gallery
let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX) {
    galleryItemCount = handleGallerySwipe(
      'left',
      domElements,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
  if (touchendX > touchstartX) {
    galleryItemCount = handleGallerySwipe(
      'right',
      domElements,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
}

domElements.expGalleryList.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
});

domElements.expGalleryList.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});
