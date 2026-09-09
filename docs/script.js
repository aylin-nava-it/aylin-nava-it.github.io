/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(
                counter.getAttribute("data-target")
            );

            let current = 0;

            const duration = 1200;

            const increment = target / (duration / 16);

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.ceil(current) + "+";

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        target + "+";

                }

            };

            updateCounter();

            observer.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }
);


counters.forEach(counter => {
    observer.observe(counter);
});


/* =====================================================
   MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

menuButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "menu-open"
        );

    }
);


/* =====================================================
   IMAGE REVEAL
===================================================== */

const images =
    document.querySelectorAll(
        ".project-card, .featured-image"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


images.forEach(image => {
    revealObserver.observe(image);
});
