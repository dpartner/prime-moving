import toogleMobMenu from '../../js/mob-menu';
import showPolicy from '../../js/policy';
import { handleSelect } from '../../js/select';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

console.log(domElements);

// Open Mobile Menu
domElements.mobMenuButton.addEventListener('click', () => {
  toogleMobMenu(domElements);
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
