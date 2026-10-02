/* =====================================================
   ANIMACIÓN DE NÚMEROS / CONTADORES
===================================================== */
const counters = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.getAttribute("data-target"));
            let current = 0;
            const duration = 1200;
            const increment = target / (duration / 16);

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    counter.textContent = Math.ceil(current) + "+";
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + "+";
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
   MENÚ INTERACTIVO
===================================================== */
const menuButton = document.getElementById("menuButton");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
    });
}

/* =====================================================
   REVELADO SUAVE DE IMÁGENES AL HACER SCROLL
===================================================== */
const images = document.querySelectorAll(".project-card, .featured-image");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
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

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       ANIMACIÓN DE NÚMEROS / CONTADORES
    ===================================================== */
    const counters = document.querySelectorAll("[data-target]");

    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.getAttribute("data-target"));
                let current = 0;
                const duration = 1200;
                const increment = target / (duration / 16);

                const updateCounter = () => {
                    current += increment;

                    if (current < target) {
                        counter.textContent = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + "+";
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => counterObserver.observe(counter));

    /* =====================================================
       MENÚ INTERACTIVO
    ===================================================== */
    const menuButton = document.getElementById("menuButton");
    if (menuButton) {
        menuButton.addEventListener("click", () => {
            document.body.classList.toggle("menu-open");
        });
    }

    /* =====================================================
       REVELADO SUAVE DE IMÁGENES
    ===================================================== */
    const images = document.querySelectorAll(".project-card, .featured-image");
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    images.forEach(image => revealObserver.observe(image));

    /* =====================================================
       MODAL DE EVIDENCIAS PROFESIONALES
    ===================================================== */
    const modal = document.getElementById("evidenceModal");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalCompany = document.getElementById("modalCompany");
    const modalDesc = document.getElementById("modalDesc");
    const modalGallery = document.getElementById("modalGallery");
    const cardsWithModal = document.querySelectorAll(".has-modal");

    if (!modal) {
        console.error("El elemento #evidenceModal no se encontró en el DOM.");
        return;
    }

    function openModal(card) {
        const title = card.getAttribute("data-title") || "";
        const company = card.getAttribute("data-company") || "";
        const desc = card.getAttribute("data-desc") || "";
        const rawImages = card.getAttribute("data-images") || "[]";

        let images = [];
        try {
            images = JSON.parse(rawImages);
        } catch (e) {
            // Fallback si las comillas vienen alteradas
            images = rawImages.replace(/[\[\]"']/g, "").split(",").map(s => s.trim()).filter(Boolean);
        }

        modalTitle.textContent = title;
        modalCompany.textContent = company;
        modalDesc.textContent = desc;

        // Renderizado de imágenes
        modalGallery.innerHTML = images.map((src, index) => `
            <div class="gallery-item">
                <img src="${src}" alt="Evidencia ${index + 1} - ${company}" loading="lazy">
            </div>
        `).join("");

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    cardsWithModal.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(card);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
