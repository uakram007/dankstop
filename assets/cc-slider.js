document.addEventListener("DOMContentLoaded", () => {
    const productSlider = document.querySelectorAll(".cc-products-slider");

    if (productSlider.length > 0) {
        productSlider.forEach((slider) => {
            new Splide(slider, {
                perPage: 3,
                gap: "26px",
                rewind: true,
                arrows: false,
                pagination: false,
                breakpoints: {
                    1200: {
                        perPage: 2,
                    },
                    800: {
                        type: "loop",
                        padding: "15%",
                        perPage: 1,
                    },
                },
            }).mount();
        });
    }

    const sitesSlider = document.querySelectorAll(".cc-sites-slider");

    if (sitesSlider.length > 0) {
        sitesSlider.forEach((slider) => {
            new Splide(slider, {
                perPage: 4,
                gap: "24px",
                rewind: true,
                arrows: false,
                pagination: false,
                breakpoints: {
                    1200: {
                        perPage: 2,
                    },
                    800: {
                        type: "loop",
                        padding: "15%",
                        perPage: 1,
                    },
                },
            }).mount();
        });
    }
});