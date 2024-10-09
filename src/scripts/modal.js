function openPopup(popup) {
  if (popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupOnEsc);
  }
}

function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupOnEsc);
  }
}

function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function closePopupOnOverlay(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
}

export { openPopup, closePopup, closePopupOnOverlay };
