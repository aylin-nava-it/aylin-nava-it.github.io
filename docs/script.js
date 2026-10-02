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

function openModal(card) {
    const title = card.getAttribute("data-title");
    const company = card.getAttribute("data-company");
    const desc = card.getAttribute("data-desc");
    const images = JSON.parse(card.getAttribute("data-images") || "[]");

    modalTitle.textContent = title;
    modalCompany.textContent = company;
    modalDesc.textContent = desc;

    // Generar imágenes de evidencia
    modalGallery.innerHTML = images.map((src, index) => `
        <div class="gallery-item">
            <img src="${src}" alt="Evidencia ${index + 1} - ${company}">
        </div>
    `).join("");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
}

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restablece el scroll
}

cardsWithModal.forEach(card => {
    card.addEventListener("click", () => openModal(card));
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});
