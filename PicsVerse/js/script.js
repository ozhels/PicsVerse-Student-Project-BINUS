let currentIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(autoSlide, 3000);

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".image-slider");

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", function (e) {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

        e.preventDefault();
    });

    slider.addEventListener("mouseleave", function () {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", function () {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener("touchstart", function (e) {
        isDown = true;
        slider.classList.add("active");
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchend", function () {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("touchmove", function (e) {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});
