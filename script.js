document.documentElement.classList.add("js-enabled");

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(item);
});

const bookingForm = document.querySelector("#bookingForm");
const phoneNumber = "5515981713271";

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const clientName = document.querySelector("#clientName").value.trim();
  const serviceName = document.querySelector("#serviceName").value.trim();
  const preferredDate = document.querySelector("#preferredDate").value.trim();
  const preferredTime = document.querySelector("#preferredTime").value.trim();
  const notes = document.querySelector("#notes").value.trim();

  const message = [
    "Olá, Francini! Quero agendar um horário.",
    "",
    `Nome: ${clientName || "Não informado"}`,
    `Serviço: ${serviceName || "Não informado"}`,
    `Dia preferido: ${preferredDate || "A combinar"}`,
    `Horário preferido: ${preferredTime || "A combinar"}`,
    `Observações: ${notes || "Nenhuma"}`
  ].join("\n");

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".lightbox-close");
const galleryButtons = document.querySelectorAll(".gallery-item");

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function hideLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    openLightbox(button.dataset.image, image.alt);
  });
});

closeLightbox.addEventListener("click", hideLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hideLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideLightbox();
  }
});
