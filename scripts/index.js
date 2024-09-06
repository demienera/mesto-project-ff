// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  const deleteCardButton = card.querySelector('.card__delete-button');

  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;

  deleteCardButton.addEventListener('click', (event) => {
    const currentButton = event.target;
    deleteCard(currentButton)
  })

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(button) {
  const listItem = button.closest('.card');
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardsList = document.querySelector('.places__list');
  const createdCard = createCard(card, deleteCard);
  cardsList.append(createdCard);
})
