// Функция открытия модального окна
export function openModal(popup) {

    popup.classList.add('popup_is-opened', 'popup_is-animated');

    document.addEventListener('keydown', handleKeydown);
};

// Функция закрытия модального окна
export function closeModal(popup) { 

    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', handleKeydown); 
};

// Обработчик клика по оверлею
export function handleClickOnOverlay(evt) { 

    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    };
};

// Функция добавляющая на кнопку Крестик функцию закрытия 
export function setCloseModalByButton(popup) {

    const buttonPopupClose = popup.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', () => closeModal(popup));
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