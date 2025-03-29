import '../pages/index.css';
import {createCard, deleteCard, likeCard, checkLikeByUser} from './card.js';
import {openModal, closeModal, handleClickOnOverlay, setCloseModalByButton} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserData, getInitialCards, editUserData, addCard, delCard, setLikeOnCard, removeLikeFromCard, changeAvatar} from './api.js';

const placesList = document.querySelector('.places__list');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userPhoto = document.querySelector('.profile__image');

const popupAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.querySelector('.popup_type_avatar .popup__form');
const avatarLinkInput = formElementAvatar.querySelector('.popup__input_type_avatar');
const buttonAvatarSave = formElementAvatar.querySelector('.popup__button');

const popupProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const formElementEditProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description');
const buttonProfileSave = formElementEditProfile.querySelector('.popup__button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');

const formElementNewCard =document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formElementNewCard.querySelector('.popup__input_type_url');
const buttonNewCardSave = formElementNewCard.querySelector('.popup__button');

const popupImage = document.querySelector('.popup_type_image');
const imagePopup = popupImage.querySelector('.popup__image');
const imagePopupCaption = popupImage.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);


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


function handleFormAvatrSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, buttonAvatarSave);

    changeAvatar(avatarLinkInput.value)
        .then((data) =>{
            userPhoto.style.backgroundImage = `url(${data.avatar})`;
            formElementAvatar.reset();
            closeModal(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(false, buttonAvatarSave))
};


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


function handleFormNewCardSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, buttonNewCardSave);

    addCard(cardNameInput.value, cardUrlInput.value)
        .then((data) => {
            placesList.prepend(createCard(data, deleteCard, delCard, checkLikeByUser, likeCard, showImageModal, setLikeOnCard, removeLikeFromCard, data.owner['_id']));
            formElementNewCard.reset();
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(false, buttonNewCardSave))
};


function showImageModal(link, name) {
    openModal(popupImage);

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


function setValueToForm() {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent;

};


userPhoto.addEventListener('click', () => {
    clearValidation(formElementAvatar, validationConfig);
    openModal(popupAvatar);
});

setCloseModalByButton(popupAvatar);

popupAvatar.addEventListener('click', handleClickOnOverlay);

formElementAvatar.addEventListener('submit', handleFormAvatrSubmit);


buttonEditProfile.addEventListener('click', () => {
    clearValidation(formElementEditProfile, validationConfig);
    openModal(popupProfile);
    setValueToForm(popupProfile);
}); 

setCloseModalByButton(popupProfile);

popupProfile.addEventListener('click', handleClickOnOverlay);

formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit);


buttonAddCard.addEventListener('click', () => {
    clearValidation(formElementNewCard, validationConfig);
    openModal(popupNewCard);
});

setCloseModalByButton(popupNewCard);

popupNewCard.addEventListener('click', handleClickOnOverlay);

formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);


setCloseModalByButton(popupImage);
popupImage.addEventListener('click', handleClickOnOverlay);