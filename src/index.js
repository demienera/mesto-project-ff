import "./pages/index.css";
import {
  cardsList,
  profileButton,
  newCardButton,
  popups,
  popupEditProfile,
  popupAddProfile,
  popupOpenImage,
  popupImage,
  popupCaption,
  formElement,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  newImageForm,
  imageNameInput,
  imageUrlInput,
} from "./scripts/constants";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, handleLikeCard } from "./scripts/card";
import { openPopup, closePopup, closePopupOnOverlay } from "./scripts/modal";

function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupOpenImage);
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

  cardsList.prepend(
    createCard({ name, link }, deleteCard, handleLikeCard, openImagePopup)
  );
  closePopup(popupAddProfile);

  newImageForm.reset();
}

function handleProfileEditClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

initialCards.forEach((card) => {
  cardsList.append(
    createCard(card, deleteCard, handleLikeCard, openImagePopup)
  );
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });

  closePopupOnOverlay(popup);
});

newCardButton.addEventListener("click", () => {
  openPopup(popupAddProfile);
});
profileButton.addEventListener("click", handleProfileEditClick);
formElement.addEventListener("submit", handleFormSubmit);
newImageForm.addEventListener("submit", handleFormSubmitImage);

export { openImagePopup };
