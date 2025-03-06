// Функция создания карточки
export function createCard (cardData, deleteCard, likeCard, showImageModal) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeCard(likeButton));

    cardImage.addEventListener('click', () => showImageModal(cardData.link, cardData.name));

    return cardElement;

};

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
};

// Функция лайка карточки
export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
};

