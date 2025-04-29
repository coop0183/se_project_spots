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
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
    editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
    newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    console.log("Form submitted!");
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    editProfileModal.classList.remove("modal_is-opened");
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
    evt.preventDefault();
    console.log("New post form submitted!");
    const newPostImage = newPostImageInput.value;
    const newPostCaption = newPostCaptionInput.value;
    console.log("Image:", newPostImage);
    console.log("Caption:", newPostCaption);
    newPostModal.classList.remove("modal_is-opened");
}

newPostModal.addEventListener("submit", handleNewPostFormSubmit);
