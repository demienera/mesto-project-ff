import { cardTemplate, openImagePopup } from "../index";

function createCard(item, deleteCard, handleLikeCard) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteCardButton = card.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  deleteCardButton.addEventListener("click", (event) => {
    deleteCard(event.target);
  });

  cardLikeButton.addEventListener("click", (event) => {
    handleLikeCard(event.target);
  });

  cardImage.addEventListener("click", openImagePopup);

  return card;
}

function deleteCard(button) {
  const deleteButton = button.closest(".card");

  if (!deleteButton) {
    return;
  }

  deleteButton.remove();
}

function handleLikeCard(event) {
  const likeButton = event;

  if (likeButton.classList.contains("card__like-button")) {
    likeButton.classList.toggle("card__like-button_is-active");
  } else {
    return;
  }
}

export { createCard, deleteCard, handleLikeCard };
