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
        { threshold: 0.15 }
    );

    images.forEach(image => revealObserver.observe(image));

    /* =====================================================
       MODAL DE EVIDENCIAS PROFESIONALES (MULTIMEDIA ADAPTABLE)
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
        console.warn("Elemento #evidenceModal no encontrado.");
        return;
    }

    function openModal(card) {
        const title = card.getAttribute("data-title") || "";
        const company = card.getAttribute("data-company") || "";
        const desc = card.getAttribute("data-desc") || "";
        const rawPoints = card.getAttribute("data-points") || "";
        const videoSrc = card.getAttribute("data-video");
        const rawImages = card.getAttribute("data-images") || "[]";

        let mediaList = [];
        try {
            mediaList = JSON.parse(rawImages);
        } catch (e) {
            mediaList = rawImages.replace(/[\[\]"']/g, "").split(",").map(s => s.trim()).filter(Boolean);
        }

        // Si la tarjeta define un atributo data-video específico, se inserta al inicio
        if (videoSrc && !mediaList.includes(videoSrc)) {
            mediaList.unshift(videoSrc);
        }

        if (modalTitle) modalTitle.textContent = title;
        if (modalCompany) modalCompany.textContent = company;

        // Construcción de la descripción y viñetas
        if (modalDesc) {
            let descHTML = `<p class="modal-intro">${desc}</p>`;
            if (rawPoints) {
                const pointsList = rawPoints.split("|").filter(Boolean);
                descHTML += `<ul class="modal-bullets">`;
                pointsList.forEach(point => {
                    descHTML += `<li>${point.trim()}</li>`;
                });
                descHTML += `</ul>`;
            }
            modalDesc.innerHTML = descHTML;
        }

        // Renderizado dinámico: comprueba si cada archivo es video MP4 o imagen
        if (modalGallery) {
            let galleryHTML = "";

            mediaList.forEach((src, index) => {
                const isVideo = src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".webm");

                if (isVideo) {
                    galleryHTML += `
                        <div class="gallery-item">
                            <video controls playsinline preload="metadata" class="modal-video">
                                <source src="${src}" type="video/mp4">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    `;
                } else {
                    galleryHTML += `
                        <div class="gallery-item">
                            <img src="${src}" alt="Evidencia ${index + 1} - ${company}" loading="lazy">
                        </div>
                    `;
                }
            });

            modalGallery.innerHTML = galleryHTML;
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        // Pausa automática de videos activos al cerrar la ventana modal
        if (modalGallery) {
            const activeVideos = modalGallery.querySelectorAll("video");
            activeVideos.forEach(v => v.pause());
        }
    }

    cardsWithModal.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(card);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
