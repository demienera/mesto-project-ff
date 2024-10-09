// CARDS
export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

// BUTTONS
export const profileButton = document.querySelector(".profile__edit-button");
export const newCardButton = document.querySelector(".profile__add-button");

// POPUPS
export const popups = document.querySelectorAll(".popup");
export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddProfile = document.querySelector(".popup_type_new-card");
export const popupOpenImage = document.querySelector(".popup_type_image");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");

// FORMS
export const formElement = document.forms["edit-profile"];
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const newImageForm = document.forms["new-place"];
export const imageNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
export const imageUrlInput = document.querySelector(".popup__input_type_url");
