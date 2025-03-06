// Функция открытия модального окна
export function openModal(popup) {

    popup.classList.add('popup_is-opened', 'popup_is-animated');

    setValuetoForm(popup);
    setCloseModalByButton(popup);
    document.addEventListener('keydown', handleKeydown);
};

// Функция закрытия модального окна
export function closeModal(popup) { 

    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', handleKeydown); 
};

// Обработчик клика по оверлею
export function handleClickOnOverlay(element, popup) { 

    if (element.target.classList.contains('popup')) {
        closeModal(popup);
    };
};

// Функция добавляющая на кнопку Крестик функцию закрытия 
function setCloseModalByButton(popup) {

    if (popup.classList.contains('popup_is-opened')) {
        const buttonPopupClose = popup.querySelector('.popup__close');
        buttonPopupClose.addEventListener('click', () => closeModal(popup));
    }
};

// Функция возвращающая открытое модальное окно
export function getOpenedPopup() {

    const openedPopup = document.querySelector('.popup_is-opened'); 
    return openedPopup;
};

// обработчик нажатия на Escape
function handleKeydown(evt) {

    if (evt.key === 'Escape') {
        closeModal(getOpenedPopup());
    }
};

// функция запоняющая поля формы
function setValuetoForm(popup) {

    if (popup.classList.contains('popup_type_edit')) {
        
        const nameInput = popup.querySelector('.popup__input_type_name');
        const jobInput = popup.querySelector('.popup__input_type_description');

        nameInput.value = document.querySelector('.profile__title').textContent;
        jobInput.value = document.querySelector('.profile__description').textContent;
    }
};
