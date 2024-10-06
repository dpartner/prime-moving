import toogleMobMenu from "../../js/mob-menu";
import shownFaqAnswer from "../../js/faq";
import { handleSelect } from "../../js/select";
import { handleGallery, handleGallerySwipe } from "../../js/exp-gallery";
// import { addGalleryImg, GalleryLibrary } from './js/add-gallery';
import showPolicy from "../../js/policy";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import throttle from "lodash.throttle";
import IMask from "imask";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Render dynamyc elements
// document.querySelector('.experience-gallery-list').innerHTML =
//   addGalleryImg(GalleryLibrary);

// console.log(addGalleryImg(GalleryLibrary));

showPolicy();

const domElements = {
  mobMenuButton: document.querySelector(".mob-menu-button"),
  mobMenu: document.querySelector(".mobile-menu"),
  modalBackDrop: document.querySelector(".modal-backdrop"),
  modalForm: document.querySelector("#form"),
  modalCloseButton: document.querySelector(".modal-close-button"),
  modalServiceSelect: document.querySelector('[data-listname="service"]'),
  modalRequirementSelect: document.querySelector(
    '[data-listname="requirement"]'
  ),
  expGalleryButtonsWrap: document.querySelector(".gallery-arrow-wrap.exp"),
  expGalleryList: document.querySelector(".experience-gallery-list.exp"),
  expGalleryItem: document.querySelector(".experience-gallery-item.exp"),
  expGalleryNumberItem: document.querySelector('[data-gallery="count"]'),
  expGalleryNumberLength: document.querySelector('[data-gallery="length"]'),
  goalGalleryButtonsWrap: document.querySelector(".gallery-arrow-wrap.goal"),
  goalGalleryList: document.querySelector(".experience-gallery-list.goal"),
  goalGalleryItem: document.querySelector(".experience-gallery-item.goal"),
  goalGalleryNumberItem: document.querySelector('[data-goalGallery="count"]'),
  goalGalleryNumberLength: document.querySelector(
    '[data-goalGallery="length"]'
  ),
};

// Open Mobile Menu
domElements.mobMenuButton.addEventListener("click", () => {
  toogleMobMenu(domElements);
});

// FAQ open answers handle

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

function closeModal() {
  domElements.modalBackDrop.classList.add("is-hidden");
  window.removeEventListener("keydown", closeModal);
  domElements.modalBackDrop.removeEventListener("click", closeModal);
}

// Open Modal form
document.querySelector("body").addEventListener("click", (ev) => {
  if (ev.target.dataset.set === "open-modal") {
    domElements.modalBackDrop.classList.remove("is-hidden");
    loaderHeight();
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
    domElements.modalBackDrop.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        closeModal();
      }
    });
  }
});

function loaderHeight() {
  let modalContainer = document.querySelector(".modal-container");
  let loader = document.querySelector(".loader-wrap");
  let loaderHeight = modalContainer.scrollHeight - 128;

  loader.style.height = loaderHeight + "px";
}

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

// Experiense section and goal section gallery handle

domElements.goalGalleryNumberLength.textContent =
  domElements.goalGalleryList.children.length;

let galleryItemCount = 0;
let goalGalleryItemCount = 0;

domElements.goalGalleryButtonsWrap.addEventListener("click", (ev) => {
  goalGalleryItemCount = handleGallery(
    ev,
    domElements.goalGalleryList,
    domElements.goalGalleryItem,
    domElements.goalGalleryNumberItem,
    goalGalleryItemCount
  );
});

// Swipe gallery
let touchstartX = 0;
let touchendX = 0;
let goalTouchstartX = 0;
let goalTouchendX = 0;

function checkDirectionExp() {
  if (touchendX < touchstartX) {
    galleryItemCount = handleGallerySwipe(
      "left",
      domElements.expGalleryList,
      domElements.expGalleryItem,
      domElements.expGalleryNumberItem,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
  if (touchendX > touchstartX) {
    galleryItemCount = handleGallerySwipe(
      "right",
      domElements.expGalleryList,
      domElements.expGalleryItem,
      domElements.expGalleryNumberItem,
      galleryItemCount
    );
    touchstartX = 0;
    touchendX = 0;
  }
}

function checkDirectionGoal() {
  if (goalTouchendX < goalTouchstartX) {
    goalGalleryItemCount = handleGallerySwipe(
      "left",
      domElements.goalGalleryList,
      domElements.goalGalleryItem,
      domElements.goalGalleryNumberItem,
      goalGalleryItemCount
    );
    goalTouchstartX = 0;
    goalTouchendX = 0;
  }
  if (goalTouchendX > goalTouchstartX) {
    goalGalleryItemCount = handleGallerySwipe(
      "right",
      domElements.goalGalleryList,
      domElements.goalGalleryItem,
      domElements.goalGalleryNumberItem,
      goalGalleryItemCount
    );
    goalTouchstartX = 0;
    goalTouchendX = 0;
  }
}

domElements.goalGalleryList.addEventListener("touchstart", (e) => {
  goalTouchstartX = e.changedTouches[0].screenX;
});

domElements.goalGalleryList.addEventListener("touchend", (e) => {
  goalTouchendX = e.changedTouches[0].screenX;
  checkDirectionGoal();
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
    document.querySelector(".loader-wrap").classList.add("is-show");
    document.querySelector(".modal-submit-button").textContent = "Sending...";
    setTimeout(() => {
      document.querySelector(".loader-wrap").classList.add("sended");
      document.querySelector(".modal-submit-button").textContent = "Sended";
    }, 2000);
    setTimeout(() => {
      document.querySelector(".loader-wrap").classList.remove("is-show");
      domElements.modalBackDrop.classList.add("is-hidden");
      document.querySelector(".modal-submit-button").textContent = "Send";
    }, 4000);
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

// const imgUrl = new URL('./img/exp-gallery/gallery-large-1.jpg', import.meta.url).href;

// document.getElementById('test').href = imgUrl;

// Adding production href for <a></a>

const allGalleryLargeImgLinks = document.querySelectorAll(
  ".experience-gallery-link.exp"
);
for (let i = 0; i < allGalleryLargeImgLinks.length; i++) {
  const numberElement = i + 1;
  allGalleryLargeImgLinks[i].href = getLargeImgUrl(numberElement);
}

function getLargeImgUrl(number) {
  return new URL(
    `./img/exp-gallery/gallery-large-${number}.jpg`,
    import.meta.url
  ).href;
}

// Adding SimpleLightBox only for PC version
