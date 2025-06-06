const showInputError = (formEl, inputEl, errorMsg, config) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(config.inputErrorClass);
    if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add(config.errorClass);
    }
};

const hideInputError = (formEl, inputEl, config) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(config.inputErrorClass);
    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove(config.errorClass);
    }
};

const checkInputValidity = (formEl, inputEl, config) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage, config);
    } else {
        hideInputError(formEl, inputEl, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => !inputEl.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, config) => {
    if (hasInvalidInput(inputList)) {
        disabledBtn(buttonEl, config);
    } else {
        buttonEl.classList.remove(config.inactiveButtonClass);
        buttonEl.disabled = false;
    }
};

const disabledBtn = (buttonEl, config) => {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList, config) => {
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl, config);
    });
    const buttonEl = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonEl, config);
};

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonEl = formEl.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonEl, config);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl, config);
            toggleButtonState(inputList, buttonEl, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "disabledBtn",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

enableValidation(config);
