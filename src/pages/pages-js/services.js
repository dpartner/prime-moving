import toogleMobMenu from "../../js/mob-menu";
import { data } from "./service-data.js";
import { handleSelect } from "../../js/select";
import showPolicy from "../../js/policy";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import throttle from "lodash.throttle";
import IMask from "imask";
import "simplelightbox/dist/simple-lightbox.min.css";
import symbolDefs from "../../img/svg/services/symbol-defs-services.svg";

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
  servicesList: document.querySelector(".service-list"),
  popUpBackdrop: document.querySelector(".popUp-backdrop"),
  popupContainer: document.querySelector(".popUp-container"),
  popUpCloseButton: document.querySelector(".popUp-close-button"),
};

function addMarkup() {
  const markup = createServicesMarkup(data);
  domElements.servicesList.innerHTML = markup;
}
addMarkup();

function createServicesMarkup(data) {
  return data
    .map(({ id, heading, description, icon, className }) => {
      return `
            <li class="service-list-item">
              <div
                class="section-desc-wrap service"
                data-action="open-popup"
                data-id="${id}"
              >
                <div class="section-desc-icon-wrap services">
                  <svg
                    class="section-desc-icon services ${className}"
                    width="30"
                    height="30"
                  >
                    <use
                      href="${symbolDefs}${icon}"
                    ></use>
                  </svg>
                </div>
                <h4 class="section-desc-heading services">${heading}</h4>
                <p class="section-desc services">
                  ${description} 
                </p>
              </div>
            </li>
    `;
    })
    .join("");
}

function createPopUpMarkup({ icon, heading, descriptionPopUp, className }) {
  return `
    <button class="popUp-close-button"></button>
    <div class="popUp-heading-wrap">
          <div class="popUp-icon-wrap">
            <svg class="popUp-icon ${className}" width="18" height="18">
              <use
                href="${symbolDefs}${icon}"
              ></use>
            </svg>
          </div>
          <p class="popUp-heading">${heading}</p>
        </div>
        <p class="popUp-desc">
          ${descriptionPopUp}
        </p>
  `;
}

// Open Mobile Menu
domElements.mobMenuButton.addEventListener("click", () => {
  toogleMobMenu(domElements);
});

// Open POP-up Menu
domElements.servicesList.addEventListener("click", (ev) => {
  if (ev.target.dataset.action === "open-popup") {
    const idCard = ev.target.dataset.id;
    let markup = "";
    for (const element of data) {
      if (Number(element.id) === Number(idCard)) {
        if (element.descriptionPopUp === "") {
          return;
        }
        markup = createPopUpMarkup(element);
      }
    }
    // domElements.popupContainer.insertAdjacentHTML("beforeend", markup);
    domElements.popupContainer.innerHTML = markup;
    document
      .querySelector(".popUp-close-button")
      .addEventListener("click", closePopUp);
    domElements.popUpBackdrop.classList.remove("is-hidden");
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closePopUp();
      }
    });
    domElements.popUpBackdrop.addEventListener("click", (e) => {
      if (e.target.classList.contains("popUp-backdrop")) {
        closePopUp();
      }
    });
  }
});

// domElements.popUpCloseButton.addEventListener("click", () => closePopUp());

function closePopUp() {
  domElements.popUpBackdrop.classList.add("is-hidden");
  window.removeEventListener("keydown", closePopUp);
  domElements.popUpBackdrop.removeEventListener("click", closePopUp);
  domElements.popUpBackdrop.removeEventListener("click", closePopUp);
}

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
domElements.modalCloseButton.addEventListener("click", closeModal);

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

// Scale cards in mobile

const scroolThrottle = throttle(handleScroll, 300);
if (window.screen.width < 1400) {
  window.addEventListener("scroll", scroolThrottle);
}

function handleScroll(e) {
  let cardS = document.querySelectorAll(".service-list-item");
  for (const element of cardS) {
    let screenPosition = element.getBoundingClientRect().top;
    if (
      screenPosition < window.screen.height / 2 &&
      screenPosition > window.screen.height / 4
    ) {
      element.classList.add("scale");
    } else {
      element.classList.remove("scale");
    }
  }
}
