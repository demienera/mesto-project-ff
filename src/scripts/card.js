import { deleteCardById, toggleLike } from "./api";
import { cardTemplate, popupDeleteCard } from "./constants";
import { closePopup } from "./modal";

export function createCard(
  currentCard,
  currentUser,
  handleLikeCard,
  openImagePopup,
  openDeletePopup
) {
  const cardFragment = cardTemplate.cloneNode(true);
  const card = cardFragment.querySelector(".card");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteCardButton = card.querySelector(".card__delete-button");
  const cardLikes = card.querySelector(".card__likes");

  card.dataset.cardId = currentCard._id;
  cardImage.src = currentCard.link;
  cardImage.alt = currentCard.name;
  cardTitle.textContent = currentCard.name;
  cardLikes.textContent = Array.isArray(currentCard.likes)
    ? currentCard.likes.length
    : 0;

  checkCurrentUser(currentUser, currentCard, deleteCardButton, cardLikeButton);

  cardLikeButton.addEventListener("click", () => {
    handleLikeCard(cardLikeButton, currentCard._id, cardLikes);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(currentCard.link, currentCard.name);
  });

  deleteCardButton.addEventListener("click", () => {
    openDeletePopup(card, popupDeleteCard);
  });

  return card;
}

function checkCurrentUser(currentUser, currentCard, deleteButton, likeButton) {
  if (currentCard.owner && currentCard.owner._id !== currentUser._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  const isLikedByUser =
    Array.isArray(currentCard.likes) &&
    currentCard.likes.some((like) => like._id === currentUser._id);

  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export function handleLikeCard(likeButton, cardId, likes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  toggleLike(cardId, isLiked)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likes.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}

export function deleteCard(cardToDelete, button, updateTextOnButton) {
  const cardId = cardToDelete.dataset.cardId;

  if (cardToDelete) {
    updateTextOnButton(button, "Удаление...");

    deleteCardById(cardId)
      .then(() => {
        cardToDelete.remove();
        closePopup(popupDeleteCard);
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      })
      .finally(() => {
        updateTextOnButton(button, "Да");
      });
  }
}
