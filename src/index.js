import "./pages/index.css";
import {
  cardsList,
  profileButton,
  newCardButton,
  editAvatarButton,
  popups,
  popupEditProfile,
  popupAddProfile,
  popupOpenImage,
  popupImage,
  popupCaption,
  popupEditAvatar,
  formEditProfile,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  profileImage,
  newImageForm,
  newIAvatarForm,
  imageNameInput,
  imageUrlInput,
  avatarUrlInput,
  validationConfig,
  confirmDeleteButton,
} from "./scripts/constants";
import { createCard, handleLikeCard, deleteCard } from "./scripts/card";
import { openPopup, closePopup, closePopupOnOverlay } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  getUserInfo,
  getCardList,
  editUserInfo,
  sendNewCard,
  changeAvatar,
  checkImageUrl,
} from "./scripts/api";

let cardToDelete;
let currentUserData;

export function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupOpenImage);
}

function openDeletePopup(card, popup) {
  cardToDelete = card;
  openPopup(popup);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const jobValue = jobInput.value.trim();
  const saveButton = event.target.querySelector(".popup__button");

  updateTextOnButton(saveButton, "Сохранение...");

  editUserInfo(nameValue, jobValue)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      updateTextOnButton(saveButton, "Сохранить");
    });
  closePopup(popupEditProfile);
}

function handleFormSubmitImage(event) {
  event.preventDefault();

  const newCard = { name: imageNameInput.value, link: imageUrlInput.value };
  const saveButton = event.target.querySelector(".popup__button");

  updateTextOnButton(saveButton, "Сохранение...");

  sendNewCard(newCard)
    .then((createdCard) => {
      cardsList.prepend(
        createCard(
          createdCard,
          currentUserData,
          handleLikeCard,
          openImagePopup,
          openDeletePopup
        )
      );
      closePopup(popupAddProfile);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      updateTextOnButton(saveButton, "Сохранить");
    });
}

function handleFormSubmitAvatar(event) {
  event.preventDefault();
  const avatarUrl = avatarUrlInput.value;
  const saveButton = event.target.querySelector(".popup__button");

  updateTextOnButton(saveButton, "Сохранение...");

  checkImageUrl(avatarUrl)
    .then((validImage) => {
      if (validImage) {
        changeAvatar(avatarUrl).then((data) => {
          editAvatarButton.style.backgroundImage = `url(${data.avatar})`;
          closePopup(popupEditAvatar);
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      updateTextOnButton(saveButton, "Сохранить");
    });
}

function handleProfileEditClick() {
  clearValidation(formEditProfile, validationConfig);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function renderUserProfile(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

function updateTextOnButton(button, text) {
  button.textContent = text;
}

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });

  closePopupOnOverlay(popup);
});

newCardButton.addEventListener("click", () => {
  clearValidation(newImageForm, validationConfig);
  openPopup(popupAddProfile);
});
profileButton.addEventListener("click", handleProfileEditClick);
formEditProfile.addEventListener("submit", handleFormSubmit);
newImageForm.addEventListener("submit", handleFormSubmitImage);
confirmDeleteButton.addEventListener("click", (event) => {
  deleteCard(cardToDelete, event.target, updateTextOnButton);
});
editAvatarButton.addEventListener("click", () => {
  clearValidation(newIAvatarForm, validationConfig);
  openPopup(popupEditAvatar);
});
newIAvatarForm.addEventListener("submit", handleFormSubmitAvatar);
enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardList()])
  .then(([userData, cards]) => {
    renderUserProfile(userData);
    currentUserData = userData;

    cards.forEach((card) => {
      cardsList.append(
        createCard(
          card,
          userData,
          handleLikeCard,
          openImagePopup,
          openDeletePopup
        )
      );
    });
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
