const left = document.querySelector(".forum-wrapper");
const right = document.querySelector(".online-wrapper");

function matchHeight() {
    const leftHeight = left.offsetHeight - 30;
    right.style.maxHeight = leftHeight + "px";
}

window.addEventListener("load", matchHeight);
window.addEventListener("resize", matchHeight);

document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.getElementById("sliderTrack");

    const animationSupported = "AnimationEvent" in window;

    if (!animationSupported) {
        let position = 0;
        const cardWidth = 460;
        const totalCards = 10;

        function animate() {
            position -= 1;

            if (position <= -cardWidth * totalCards) {
                position = 0;
            }

            sliderTrack.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    }

    const speedControl = {
        slow: "45s",
        medium: "30s",
        fast: "15s",
    };

    function changeSpeed(speed) {
        if (speedControl[speed]) {
            sliderTrack.style.animationDuration = speedControl[speed];
        }
    }

    function ensureSmoothScroll() {
        const currentCards = sliderTrack.querySelectorAll(".activity-card");
        const firstTenCards = Array.from(currentCards).slice(0, 10);

        if (currentCards.length < 20) {
            firstTenCards.forEach((card) => {
                const clone = card.cloneNode(true);
                sliderTrack.appendChild(clone);
            });
        }
    }

    ensureSmoothScroll();
    changeSpeed("fast");

    sliderTrack.addEventListener("animationiteration", function () {});
});
