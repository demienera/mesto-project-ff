import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, handleLikeCard } from "./scripts/card";
import { openPopup, closePopup, closePopupOnOverlay } from "./scripts/modal";

// CARDS
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
// BUTTONS
const profileButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
// POPUPS
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddProfile = document.querySelector(".popup_type_new-card");
const popupOpenImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
// FORMS
const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newImageForm = document.forms["new-place"];
const imageNameInput = document.querySelector(".popup__input_type_card-name");
const imageUrlInput = document.querySelector(".popup__input_type_url");

function openImagePopup(event) {
  if (event.target.classList.contains("card__image")) {
    const cardElement = event.target.closest(".card");
    const cardTitle = cardElement.querySelector(".card__title");

    popupImage.src = event.target.src;
    popupImage.setAttribute("alt", cardTitle.textContent);
    popupCaption.textContent = cardTitle.textContent;

    openPopup(popupOpenImage);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!nameInput || !jobInput) {
    return;
  }

  const nameValue = nameInput.value.trim();
  const jobValue = jobInput.value.trim();

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(popupEditProfile);
}

function handleFormSubmitImage(event) {
  event.preventDefault();

  if (!imageNameInput || !imageUrlInput) {
    return;
  }

  const newCard = { name: imageNameInput.value, link: imageUrlInput.value };
  const { name, link } = newCard;

  if (!cardsList) {
    return;
  }

  cardsList.prepend(createCard({ name, link }, deleteCard, handleLikeCard));
  closePopup(popupAddProfile);

  newImageForm.reset();
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card, deleteCard, handleLikeCard));
});

newCardButton.addEventListener("click", () => {
  openPopup(popupAddProfile);
});

profileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });

  closePopupOnOverlay(popup);
});

formElement.addEventListener("submit", handleFormSubmit);
newImageForm.addEventListener("submit", handleFormSubmitImage);

export { cardTemplate, openImagePopup };
