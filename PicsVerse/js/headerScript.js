document.addEventListener("DOMContentLoaded", function () {
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    const navigation = document.querySelector(".navigation");

    if (mobileNavToggle && navigation) {
        mobileNavToggle.addEventListener("click", function () {
            navigation.classList.toggle("active");

            this.classList.toggle("active");
        });

        const navLinks = document.querySelectorAll(".navigation-list li a");
        navLinks.forEach((link) => {
            link.addEventListener("click", function () {
                if (navigation.classList.contains("active")) {
                    navigation.classList.remove("active");
                    mobileNavToggle.classList.remove("active");
                }
            });
        });

        document.addEventListener("click", function (event) {
            const isClickInsideNav = navigation.contains(event.target);
            const isClickOnToggle = mobileNavToggle.contains(event.target);

            if (
                !isClickInsideNav &&
                !isClickOnToggle &&
                navigation.classList.contains("active")
            ) {
                navigation.classList.remove("active");
                mobileNavToggle.classList.remove("active");
            }
        });
    }
});
