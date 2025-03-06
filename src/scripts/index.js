import '../pages/index.css';
import initialCards from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, handleClickOnOverlay, getOpenedPopup} from './modal.js';

const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
    const newCard = createCard(card, deleteCard, likeCard, showImageModal);
    placesList.append(newCard);
});

// 1) Модальное окно профиля
const popupProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button'); 

buttonEditProfile.addEventListener('click', () => openModal(popupProfile)); 
popupProfile.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupProfile));

// Форма редактирование профиля
const formElementEditProfile = document.querySelector('.popup_type_edit .popup__form'); // получаем форму редактирования профиля
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени профиля
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description'); // гполе ввода описания профиля

// Обработчик «отправки» формы Редактирования профиля
function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();

    const nameProfile = document.querySelector('.profile__title'); // графа имени профиля 
    const jobProfile = document.querySelector('.profile__description'); // графа описания профиля 

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    formElementEditProfile.reset();

    closeModal(getOpenedPopup());
}

// Прикрепляем обработчик к форме:
formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// 2) Модальное окно добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card'); // модальное окно добавления карточки
const buttonAddCard = document.querySelector('.profile__add-button'); // кнопка открытия модалки добавления карточки

buttonAddCard.addEventListener('click', () => openModal(popupNewCard)); // вешаем слушатель на кнопку открытия модалки
popupNewCard.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupNewCard)); //на всю модалку вешаем слушатель клика по оверлею

// Форма добавления карточки
const formElementNewCard =document.querySelector('.popup_type_new-card .popup__form'); // получаем форму создания карточки
const cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name'); // поле ввода названия картинки
const cardUrlInput = formElementNewCard.querySelector('.popup__input_type_url'); // поле ввода ссылки на картинку

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
        link: cardUrlInput.value,
        name: cardNameInput.value
    }

    placesList.prepend(createCard(cardData, deleteCard, likeCard, showImageModal));
    formElementNewCard.reset();
    closeModal(getOpenedPopup());
}

formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);

// 3) Модальное окно просмотра фотографии
const popupImage = document.querySelector('.popup_type_image');
popupImage.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupImage));

// Функция показывающая картинку в модальном окне
function showImageModal(evt, image, title) {
    
    if (evt.target.classList.contains('card__image')) {
        openModal(popupImage);

        const imagePopup = popupImage.querySelector('.popup__image');
        const imagePopupCaption = popupImage.querySelector('.popup__caption');

        imagePopup.src = image.src;
        imagePopup.alt = image.alt;
        imagePopupCaption.textContent = title.textContent;
    }
};