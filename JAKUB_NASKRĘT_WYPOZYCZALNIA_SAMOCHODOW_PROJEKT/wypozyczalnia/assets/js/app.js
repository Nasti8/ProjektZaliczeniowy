document.addEventListener("DOMContentLoaded", function() {
    const THUMBNAILS = document.querySelectorAll(".thumbnail img");
    const POPUP = document.querySelector(".popup");
    const POPUP_CLOSE = document.querySelector(".popup__close");
    const POPUP_IMG = document.querySelector(".popup__img");
    const ARROW_LEFT = document.querySelector(".popup__arrow--left");
    const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

    let currentImgIndex = 0;

    const showNextImg = () => {
        if (THUMBNAILS.length > 0) {
            currentImgIndex = (currentImgIndex + 1) % THUMBNAILS.length;
            POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
        }
    };

    const showPreviousImg = () => {
        if (THUMBNAILS.length > 0) {
            currentImgIndex = (currentImgIndex - 1 + THUMBNAILS.length) % THUMBNAILS.length;
            POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
        }
    };

    const closePopup = () => {
        POPUP.classList.add("fade-out");
        setTimeout(() => {
            POPUP.classList.add("hidden");
            POPUP.classList.remove("fade-out");
            THUMBNAILS.forEach((element) => {
                element.setAttribute("tabindex", 1);
            });
        }, 300);
    };

    THUMBNAILS.forEach((thumbnail, index) => {
        const showPopup = (e) => {
            POPUP.classList.remove("hidden");
            POPUP_IMG.src = e.target.src;
            currentImgIndex = index;
            THUMBNAILS.forEach((element) => {
                element.setAttribute("tabindex", -1);
            });
        };

        thumbnail.addEventListener("click", showPopup);

        thumbnail.addEventListener("keydown", (e) => {
            if (e.code === "Enter" || e.keyCode === 13) {
                showPopup(e);
            }
        });
    });

    if (POPUP_CLOSE) {
        POPUP_CLOSE.addEventListener("click", closePopup);
    }

    if (ARROW_RIGHT) {
        ARROW_RIGHT.addEventListener("click", showNextImg);
    }

    if (ARROW_LEFT) {
        ARROW_LEFT.addEventListener("click", showPreviousImg);
    }

    document.addEventListener("keydown", (e) => {
        if (!POPUP.classList.contains("hidden")) {
            if (e.code === "ArrowRight" || e.keyCode === 39) {
                showNextImg();
            }

            if (e.code === "ArrowLeft" || e.keyCode === 37) {
                showPreviousImg();
            }

            if (e.code === "Escape" || e.keyCode === 27) {
                closePopup();
            }
        }
    });

    if (POPUP) {
        POPUP.addEventListener("click", (e) => {
            if (e.target === POPUP) {
                closePopup();
            }
        });
    }
});
