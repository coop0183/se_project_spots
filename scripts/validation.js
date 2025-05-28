const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit_btn",
    inactiveButtonClass: "disabledBtn",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(config.inputErrorClass);
    errorMsgEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
        hideInputError(formEl, inputEl);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => {
        return !inputEl.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl) => {
    if (hasInvalidInput(inputList)) {
        disabledBtn(buttonEl);
    } else {
        buttonEl.disabled = false;
    }
};

const disabledBtn = (buttonEl) => {
    buttonEl.classList.add(buttonEl.inactiveButtonClass);
    buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList) => {
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl);
    });
};

const setEventListeners = (config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonEl = formEl.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonEl);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl);
            toggleButtonState(inputList, buttonEl);
        });
    });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl.config);
    });
};

enableValidation(settings);
