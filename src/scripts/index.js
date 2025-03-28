import '../pages/index.css';
import {createCard, deleteCard, likeCard, checkLikeByUser} from './card.js';
import {openModal, closeModal, handleClickOnOverlay, setCloseModalByButton} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserData, getInitialCards, editUserData, addCard, delCard, setLikeOnCard, removeLikeFromCard, changeAvatar} from './api.js';

const placesList = document.querySelector('.places__list');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userPhoto = document.querySelector('.profile__image');

Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {

        userName.textContent = userData.name;
        userDescription.textContent = userData.about;
        userPhoto.style.backgroundImage = `url(${userData.avatar})`;

        initialCards.forEach(function(card) {
            const newCard = createCard(card, deleteCard, delCard, checkLikeByUser, likeCard, showImageModal, setLikeOnCard, removeLikeFromCard, userData['_id']);
            placesList.append(newCard);
        })

    })
    .catch((err) => {
        console.log(err);
    })

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);

// 1) Модальное окно обновления аватара
const popupAvatar = document.querySelector('.popup_type_avatar');

userPhoto.addEventListener('click', () => openModal(popupAvatar));

setCloseModalByButton(popupAvatar);

popupAvatar.addEventListener('click', handleClickOnOverlay);

// Форма обновления аватара
const formElementAvatar = document.querySelector('.popup_type_avatar .popup__form');
const avatarLinkInput = formElementAvatar.querySelector('.popup__input_type_avatar');
const buttonAvatarSave = formElementAvatar.querySelector('.popup__button');

function handleFormAvatrSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, buttonAvatarSave);

    changeAvatar(avatarLinkInput.value)
        .then((data) =>{
            userPhoto.style.backgroundImage = `url(${data.avatar})`;
            formElementAvatar.reset();
            clearValidation(formElementAvatar, validationConfig);
            closeModal(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(false, buttonAvatarSave))
};

formElementAvatar.addEventListener('submit', handleFormAvatrSubmit);

// 2) Модальное окно профиля
const popupProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');

buttonEditProfile.addEventListener('click', () => {
    clearValidation(formElementEditProfile, validationConfig);
    openModal(popupProfile);
    setValueToForm(popupProfile);
}); 

setCloseModalByButton(popupProfile);

popupProfile.addEventListener('click', handleClickOnOverlay);

function setValueToForm(popup) {

        const nameInput = popup.querySelector('.popup__input_type_name');
        const jobInput = popup.querySelector('.popup__input_type_description');

        nameInput.value = userName.textContent;
        jobInput.value = userDescription.textContent;

};

// Форма редактирование профиля
const formElementEditProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description');
const buttonProfileSave = formElementEditProfile.querySelector('.popup__button');

function handleFormEditProfileSubmit(evt) {

    evt.preventDefault();
    renderLoading(true, buttonProfileSave)

    editUserData(nameInput.value, jobInput.value)
        .then((data) => {
            userName.textContent = data.name;
            userDescription.textContent = data.about;
            closeModal(popupProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(false, buttonProfileSave))
};

formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// 3) Модальное окно добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button'); 

buttonAddCard.addEventListener('click', () => openModal(popupNewCard));

setCloseModalByButton(popupNewCard);

popupNewCard.addEventListener('click', handleClickOnOverlay);

// Форма добавления карточки
const formElementNewCard =document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formElementNewCard.querySelector('.popup__input_type_url');
const buttonNewCardSave = formElementNewCard.querySelector('.popup__button')

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, buttonNewCardSave);

    addCard(cardNameInput.value, cardUrlInput.value)
        .then((data) => {
            placesList.prepend(createCard(data, deleteCard, delCard, checkLikeByUser, likeCard, showImageModal, setLikeOnCard, removeLikeFromCard, data.owner['_id']));
            formElementNewCard.reset();
            clearValidation(formElementNewCard, validationConfig);
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(false, buttonNewCardSave))
};

formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);

// 4) Модальное окно просмотра фотографии
const popupImage = document.querySelector('.popup_type_image');

setCloseModalByButton(popupImage);

popupImage.addEventListener('click', handleClickOnOverlay);

// Функция показывающая картинку в модальном окне
function showImageModal(link, name) {
    
        openModal(popupImage);

        const imagePopup = popupImage.querySelector('.popup__image');
        const imagePopupCaption = popupImage.querySelector('.popup__caption');

        imagePopup.src = link;
        imagePopup.alt = name;
        imagePopupCaption.textContent = name;
};

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    };
};

