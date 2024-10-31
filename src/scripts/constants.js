// API
export const TOKEN = "bab42aef-5880-4dab-a24c-250debdf524c";
export const COHORT_ID = "wff-cohort-25";
export const URL = "https://mesto.nomoreparties.co";

// CARDS
export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

// BUTTONS
export const profileButton = document.querySelector(".profile__edit-button");
export const newCardButton = document.querySelector(".profile__add-button");
export const confirmDeleteButton = document.querySelector("#confirm-button");
export const editAvatarButton = document.querySelector("#edit-avatar");

// POPUPS
export const popups = document.querySelectorAll(".popup");
export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddProfile = document.querySelector(".popup_type_new-card");
export const popupOpenImage = document.querySelector(".popup_type_image");
export const popupDeleteCard = document.querySelector(
  ".popup_type_delete-card"
);
export const popupEditAvatar = document.querySelector(".popup_type_avatar");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");

// FORMS
export const formEditProfile = document.forms["edit-profile"];
export const nameInput = formEditProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
export const newImageForm = document.forms["new-place"];
export const imageNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
export const imageUrlInput = document.querySelector(".popup__input_type_url");
export const avatarUrlInput = document.querySelector(
  ".popup__input_type_avatar"
);
export const newIAvatarForm = document.forms["new-avatar"];

// PROFILE INFO
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileImage = document.querySelector(".profile__image");

// VALIDATION
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
