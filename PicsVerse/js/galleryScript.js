document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const buttonNumber = this.id.replace("btn", "");
            const boxId = "gallery" + buttonNumber;

            buttons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            const boxes = document.querySelectorAll(".gallery");
            boxes.forEach((box) => box.classList.remove("active"));
            buttons.forEach((btn) => btn.classList.remove("button-active"));
            document.getElementById(boxId).classList.add("active");
            document.getElementById(this.id).classList.add("button-active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxAvatar = document.getElementById("lightbox-avatar-img");
    const lightBoxAvatarName = document.getElementById("lightbox-avatar-name");
    const lightboxArtName = document.getElementById("lightbox-art-name");
    const lightboxTotalLikes = document.getElementById("total-likes");

    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            const itemImgSrc = this.querySelector(".img img").src;
            const itemAvatar = this.querySelector(".avatar img").src;
            const itemAvatarName =
                this.querySelector(".avatar-name").textContent;
            const itemArtName = this.querySelector(".art-name").textContent;
            const itemTotalLikes =
                this.querySelector(".likes-logo p").textContent;

            lightboxImage.src = itemImgSrc;
            lightboxAvatar.src = itemAvatar;
            lightBoxAvatarName.innerText = itemAvatarName;
            lightboxArtName.innerText = itemArtName;
            lightboxTotalLikes.innerText = itemTotalLikes;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";
        });
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
