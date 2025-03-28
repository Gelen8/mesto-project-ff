// Функция создания карточки
export function createCard (cardData, deleteCard, delCard, checkLikeByUser, likeCard, showImageModal, setLikeOnCard, removeLikeFromCard, userId, cardId) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikesCounter = cardElement.querySelector('.card__likes-counter');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikesCounter.textContent = cardData.likes.length;

    const isOwner = userId === cardData.owner['_id'];
    const deleteButton = cardElement.querySelector('.card__delete-button');

        if (!isOwner) {
            deleteButton.remove();
        };
    
    deleteButton.addEventListener('click', () => deleteCard(delCard, cardId, cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');

        if (checkLikeByUser(cardData.likes, userId)) {
            likeButton.classList.add('card__like-button_is-active');
        };

    likeButton.addEventListener('click', () => likeCard(likeButton, setLikeOnCard, cardId, cardLikesCounter, removeLikeFromCard));

    cardImage.addEventListener('click', () => showImageModal(cardData.link, cardData.name));

    return cardElement;

};

// Функция удаления карточки
export function deleteCard(delCard, cardId, card) {
    delCard(cardId)
        .catch((err) => {
            console.log(err);
        })
    card.remove();
};
 

// Функция лайка карточки
export function likeCard(button, setLikeOnCard, id, counter, removeLikeFromCard) {
    if (!button.classList.contains('card__like-button_is-active')) {
        setLikeOnCard(id)
            .then((card) => {
                counter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
        button.classList.add('card__like-button_is-active');
    } else {
        removeLikeFromCard(id)
            .then((card) => {
                counter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
        button.classList.remove('card__like-button_is-active');
    }
};

export function checkLikeByUser(likesArray, userId) {
    return likesArray.some(function(like) {
        return like['_id'] === userId;
    });
};