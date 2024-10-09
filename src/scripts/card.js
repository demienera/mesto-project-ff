import { cardTemplate } from "./constants";

function createCard(item, deleteCard, handleLikeCard, openImagePopup) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteCardButton = card.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteCardButton.addEventListener("click", () => {
    deleteCard(deleteCardButton);
  });

  cardLikeButton.addEventListener("click", () => {
    handleLikeCard(cardLikeButton);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });

  return card;
}

function deleteCard(button) {
  const cardElement = button.closest(".card");

  if (cardElement) {
    cardElement.remove();
  }
}

function handleLikeCard(likeButton) {
  if (likeButton.classList.contains("card__like-button")) {
    likeButton.classList.toggle("card__like-button_is-active");
  } else {
    return;
  }
}

export { createCard, deleteCard, handleLikeCard };
