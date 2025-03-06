import '../pages/index.css';
import initialCards from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, handleClickOnOverlay, setCloseModalByButton} from './modal.js';

const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
    const newCard = createCard(card, deleteCard, likeCard, showImageModal);
    placesList.append(newCard);
});

// 1) Модальное окно профиля
const popupProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button'); 

buttonEditProfile.addEventListener('click', () => {
    openModal(popupProfile);
    setValueToForm(popupProfile);
}); 

setCloseModalByButton(popupProfile);
popupProfile.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupProfile));

function setValueToForm(popup) {

    if (popup.classList.contains('popup_type_edit')) {
        
        const nameInput = popup.querySelector('.popup__input_type_name');
        const jobInput = popup.querySelector('.popup__input_type_description');

        nameInput.value = document.querySelector('.profile__title').textContent;
        jobInput.value = document.querySelector('.profile__description').textContent;
    }
};

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

    closeModal(popupProfile);
}

// Прикрепляем обработчик к форме:
formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// 2) Модальное окно добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const buttonAddCard = document.querySelector('.profile__add-button'); 

buttonAddCard.addEventListener('click', () => openModal(popupNewCard));
setCloseModalByButton(popupNewCard);
popupNewCard.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupNewCard));

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
    closeModal(popupNewCard);
}

formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);

// 3) Модальное окно просмотра фотографии
const popupImage = document.querySelector('.popup_type_image');
setCloseModalByButton(popupImage);
popupImage.addEventListener('click', (evt) => handleClickOnOverlay(evt, popupImage));

// Функция показывающая картинку в модальном окне
function showImageModal(link, name) {
    
        openModal(popupImage);

        const imagePopup = popupImage.querySelector('.popup__image');
        const imagePopupCaption = popupImage.querySelector('.popup__caption');

        imagePopup.src = link;
        imagePopup.alt = name;
        imagePopupCaption.textContent = name;
};