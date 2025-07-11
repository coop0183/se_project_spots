import { data } from "autoprefixer";
import "../pages/index.css";
import {
    enableValidation,
    validationConfig,
    resetValidation,
    disabledBtn,
    toggleButtonState,
    checkInputValidity,
    showInputError,
    hideInputError,
    hasInvalidInput,
    setEventListeners,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const initialCards = [
    {
        name: "Golden Gate Bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
];

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "7ca7dbe9-72ae-4982-a982-e599cd27fed8",
        "Content-Type": "application/json",
    },
});

api.getAppInfo()
    .then(([cards, data]) => {
        profileNameEl.textContent = data.name;
        profileDescriptionEl.textContent = data.about;
        profileAvatarEl.src = data.avatar;

        cards.forEach((item) => {
            const cardElement = getCardElement(item);
            cardsList.append(cardElement);
        });
    })
    .catch(console.error);

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
    "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
    "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostImageEl = newPostModal.querySelector(".card__image");
const newPostCaptionEl = newPostModal.querySelector(".card__title");

const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarModalForm = avatarModal.querySelector(".modal__form");
const avatarImageInput = avatarModal.querySelector("#profile-avatar-input");
const profileAvatarEl = document.querySelector(".profile__avatar");

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const cancelModalBtn = deleteModal.querySelector("#modal__cancel-btn");
const deleteModalBtn = deleteModal.querySelector("#modal__delete-btn");
const deleteForm = deleteModal.querySelector(".modal__form");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const errorEl = document.querySelector(".error");
const errorMsg = document.querySelector(".error__message");

let selectedCard;
let selectedCardId;

function getCardElement(data) {
    const cardElement = cardTemplate.content
        .querySelector(".card")
        .cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;
    cardElement.id = data._id;

    const isLiked = data.isLiked;
    const likeBtn = cardElement.querySelector(".card__like-btn");
    if (isLiked) {
        likeBtn.classList.add("card__like-btn_active");
    }

    likeBtn.addEventListener("click", (evt) =>
        handleLikeCard(evt, data._id, cardElement)
    );

    const deleteBtn = cardElement.querySelector(".card__delete-btn");
    deleteBtn.addEventListener("click", () =>
        handleDeleteCard(cardElement, data._id)
    );

    cardImageEl.addEventListener("click", () => {
        previewModalImageEl.src = data.link;
        previewModalImageEl.alt = data.name;
        previewModalCaptionEl.textContent = data.name;
        openModal(previewModal);
    });

    return cardElement;
}

function handleDeleteSubmit(evt) {
    evt.preventDefault();
    const submitBtn = evt.submitter;
    submitBtn.textContent = "Deleting...";
    api.deleteCard(selectedCardId)
        .then(() => {
            selectedCard.remove();
            closeModal(deleteModal);
        })
        .catch(console.error)
        .finally(() => {
            submitBtn.textContent = "Delete";
        });
}

function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
}

function handleLikeCard(evt, cardId, cardElement) {
    const isLiked = evt.target.classList.contains("card__like-btn_active");

    api.toggleLikeCard(cardId, isLiked)
        .then((data) => {
            if (data) {
                evt.target.classList.toggle("card__like-btn_active");
            }
            localStorage.setItem("likedCard", cardId);
        })
        .catch(console.error);
}

function handleEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".modal_is-opened");
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

function openModal(modal) {
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", overlayClickListener);
}

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("click", overlayClickListener);
    document.removeEventListener("keydown", handleEscape);
}

editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    resetValidation(
        editProfileForm,
        [editProfileNameInput, editProfileDescriptionInput],
        validationConfig
    );

    openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
    openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
    openModal(avatarModal);
});

document.querySelectorAll(".modal__close-btn").forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
});

editProfileModal.addEventListener("submit", function (evt) {
    evt.preventDefault(evt);

    const submitBtn = evt.submitter;
    submitBtn.textContent = "Saving...";

    api.editUserInfo({
        name: editProfileNameInput.value,
        about: editProfileDescriptionInput.value,
    })
        .then((data) => {
            if (data) {
                profileNameEl.textContent = data.name;
                profileDescriptionEl.textContent = data.about;
            }
            closeModal(editProfileModal);
            editProfileForm.reset();
            disabledBtn(editProfileBtn, validationConfig);
        })
        .catch(console.error)
        .finally(() => {
            submitBtn.textContent = "Save";
        });
});

newPostModal.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const submitBtn = evt.submitter;
    submitBtn.textContent = "Saving...";

    api.addNewCard({
        name: newPostCaptionInput.value,
        link: newPostImageInput.value,
    })
        .then((data) => {
            if (data) {
                const cardElement = getCardElement(data);
                cardsList.prepend(cardElement);
            }
            closeModal(newPostModal);
            newPostForm.reset();
            disabledBtn(newPostSubmitBtn, validationConfig);
        })
        .catch(console.error)
        .finally(() => {
            submitBtn.textContent = "Save";
        });
});

avatarModal.addEventListener("submit", function (evt) {
    evt.preventDefault(evt);

    const submitBtn = evt.submitter;
    submitBtn.textContent = "Saving...";

    api.editAvatarInfo(avatarImageInput.value)
        .then((data) => {
            if (data) {
                profileAvatarEl.src = data.avatar;
            }
            closeModal(avatarModal);
            avatarModalForm.reset();
        })
        .catch(console.error)
        .finally(() => {
            submitBtn.textContent = "Save";
        });
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

const overlayClickListener = (evt) => {
    if (evt.target.classList.contains("modal")) {
        closeModal(evt.target);
    }
};

enableValidation(validationConfig);
