const showInputError = (formEl, inputEl, errorMsg, validationConfig) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(validationConfig.inputErrorClass);
    if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add(validationConfig.errorClass);
    }
};

const hideInputError = (formEl, inputEl, validationConfig) => {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(validationConfig.inputErrorClass);
    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove(validationConfig.errorClass);
    }
};

const checkInputValidity = (formEl, inputEl, validationConfig) => {
    if (!inputEl.validity.valid) {
        showInputError(
            formEl,
            inputEl,
            inputEl.validationMessage,
            validationConfig
        );
    } else {
        hideInputError(formEl, inputEl, validationConfig);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => !inputEl.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        disabledBtn(buttonEl, validationConfig);
    } else {
        buttonEl.classList.remove(validationConfig.inactiveButtonClass);
        buttonEl.disabled = false;
    }
};

const disabledBtn = (buttonEl, validationConfig) => {
    buttonEl.classList.add(validationConfig.inactiveButtonClass);
    buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList, validationConfig) => {
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl, validationConfig);
    });
    const buttonEl = formEl.querySelector(
        validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, buttonEl, validationConfig);
};

const setEventListeners = (formEl, validationConfig) => {
    const inputList = Array.from(
        formEl.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonEl = formEl.querySelector(
        validationConfig.submitButtonSelector
    );

    toggleButtonState(inputList, buttonEl, validationConfig);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl, validationConfig);
            toggleButtonState(inputList, buttonEl, validationConfig);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, validationConfig);
    });
};

const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "disabledBtn",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

export {
    enableValidation,
    validationConfig,
    resetValidation,
    disabledBtn,
    toggleButtonState,
    checkInputValidity,
    showInputError,
    hideInputError,
};
