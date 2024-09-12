import toogleMobMenu from "./js/mob-menu";
import shownFaqAnswer from "./js/faq";
import { handleSelect } from "./js/select";
import { handleGallery, handleGallerySwipe } from "./js/exp-gallery";
// import { addGalleryImg, GalleryLibrary } from './js/add-gallery';
import showPolicy from "./js/policy";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import throttle from "lodash.throttle";
import IMask from "imask";

// Render dynamyc elements
// document.querySelector('.experience-gallery-list').innerHTML =
//   addGalleryImg(GalleryLibrary);

// console.log(addGalleryImg(GalleryLibrary));

showPolicy();

const domElements = {
  mobMenuButton: document.querySelector(".mob-menu-button"),
  mobMenu: document.querySelector(".mobile-menu"),
  faqList: document.querySelector(".faq-list"),
  faqAnswer: document.querySelectorAll(".faq-list-item-answer"),
  modalBackDrop: document.querySelector(".modal-backdrop"),
  modalForm: document.querySelector("#form"),
  modalCloseButton: document.querySelector(".modal-close-button"),
  modalServiceSelect: document.querySelector('[data-listname="service"]'),
  modalRequirementSelect: document.querySelector(
    '[data-listname="requirement"]'
  ),
  expGalleryButtonsWrap: document.querySelector(".gallery-arrow-wrap"),
  expGalleryList: document.querySelector(".experience-gallery-list"),
  expGalleryItem: document.querySelector(".experience-gallery-item"),
  expGalleryNumberItem: document.querySelector('[data-gallery="count"]'),
  expGalleryNumberLength: document.querySelector('[data-gallery="length"]'),
};

// Open Mobile Menu
domElements.mobMenuButton.addEventListener("click", () => {
  toogleMobMenu(domElements);
});

// FAQ open answers handle
domElements.faqList.addEventListener("click", (ev) => {
  shownFaqAnswer(ev, domElements);
});

// Custom select handle
domElements.modalForm.addEventListener("click", (ev) => {
  if (ev.target.dataset.type === "customSelect") {
    const listName = ev.target.name;
    handleSelect(ev, listName);
  } else {
    domElements.modalServiceSelect.classList.remove("is-show");
    domElements.modalRequirementSelect.classList.remove("is-show");
    let customSelectsArr = domElements.modalForm.querySelectorAll(
      '[data-type="customSelect"]'
    );
    for (const list of customSelectsArr) {
      if (list.classList.contains("error")) validation(list);
    }
  }
});

// Close Modal form
domElements.modalCloseButton.addEventListener("click", () =>
  domElements.modalBackDrop.classList.add("is-hidden")
);

// Open Modal form
document.querySelector("body").addEventListener("click", (ev) => {
  if (ev.target.dataset.set === "open-modal") {
    domElements.modalBackDrop.classList.remove("is-hidden");
  }
});

// Adding custom calendar in Modal Form
flatpickr("#date", {
  position: "below center",
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
domElements.expGalleryButtonsWrap.addEventListener("click", (ev) => {
  galleryItemCount = handleGallery(ev, domElements, galleryItemCount);
});

// Swipe gallery
let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX) {
    galleryItemCount = handleGallerySwipe(
      "left",
      domElements,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
  if (touchendX > touchstartX) {
    galleryItemCount = handleGallerySwipe(
      "right",
      domElements,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
}

domElements.expGalleryList.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

domElements.expGalleryList.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

// Sending formData to Mail and validation

const throttleInput = throttle((e) => {
  if (e.target.classList.contains("error")) {
    handleInputValidation(e);
  }
}, 700);

domElements.modalForm.addEventListener("submit", handleSendingMail);
domElements.modalForm.addEventListener("change", handleInputValidation);

// If elements already has class error - start validation on every input symbol
domElements.modalForm.addEventListener("input", throttleInput);

const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// Phone mask for Modal
let phoneInput = document.querySelector('input[name="phone"]');

let phoneMask = IMask(phoneInput, {
  mask: "+0(000)000-0000",
  lazy: false, // make placeholder always visible
  placeholderChar: "_", // defaults to '_'
});

// Sending data to PHP -> send mail

async function handleSendingMail(e) {
  e.preventDefault();

  // Check all required fields is valid become send
  const formElementsArr = e.target.elements;
  let isFormValid = [];
  for (let el of formElementsArr) {
    if (el.hasAttribute("required")) {
      isFormValid.push(validation(el));
    }
  }

  // if all field valid can send
  for (let inputValid of isFormValid) {
    if (!inputValid) {
      console.log("Form not valid");
      return;
    }
  }

  console.log("Form sended");

  // Send code
  let formData = new FormData(domElements.modalForm);

  let response = await fetch("../send.php", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    let result = await response.json();
    console.log(result.result);
    console.log(result.status);
    domElements.modalForm.reset();
  } else {
    console.log("Ошибка отправки");
  }
}

function handleInputValidation(e) {
  validation(e.target);
}

function validation(input) {
  const formElement = input;
  const formElementName = input.name;
  const formElementValue = input.value;

  if (formElementName === "email") {
    if (!patternEmail.test(formElementValue)) {
      formElement.classList.add("error");
      return false;
    } else formElement.classList.remove("error");
  }

  if (formElementName === "phone") {
    if (formElementValue.replaceAll("_", "").length < 15) {
      formElement.classList.add("error");
      return false;
    } else formElement.classList.remove("error");
  }
  if (formElementName === "terms-checkbox" && formElement.checked === false) {
    console.log("not checked");
    formElement.classList.add("error");
    return false; // checkbox is checked
  } else if (formElementValue.trim().length === 0) {
    formElement.classList.add("error");
    return false;
  } else formElement.classList.remove("error");
  return true;
}
