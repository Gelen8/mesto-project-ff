// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard (initialCards, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = initialCards.link;
    cardTitle.textContent = initialCards.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;

// @todo: Функция удаления карточки
    function deleteCard() {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    }

}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const newCard = createCard(item);
    placesList.append(newCard);
});