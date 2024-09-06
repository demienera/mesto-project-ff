// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteCardButton = card.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;

  deleteCardButton.addEventListener('click', (event) => {
    const currentButton = event.target;
    deleteCard(currentButton)
  })

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(button) {
  button.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  cardsList.append(createCard(card, deleteCard));
})
