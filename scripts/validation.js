const showInputError = (formEl, inputEl, config) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(config.errorClass, config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorEl.textContent = "";
    errorEl.classList.remove(config.errorClass, config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage, config);
    } else {
        hideInputError(formEl, inputEl, config);
    }
};

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputEl) => !inputEl.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, config) => {
    if (hasInvalidInput(inputList)) {
        disabledBtn(buttonEl, config);
    } else {
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
    errorClass: "modal__error",
};

enableValidation(config);
