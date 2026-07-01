/*menu hamburguer*/

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });

});
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 120}ms`;
  observer.observe(card);
});

/* Noticies*/
fetch("news.json")
  .then(res => res.json())
  .then(data => {

    const container = document.querySelector(".news-container");

    // 🧠 ordenar por fecha (más reciente primero)
    data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    data.forEach(noticia => {
      const card = document.createElement("div");
      card.classList.add("news-card");

      const fechaFormateada = new Date(noticia.fecha).toLocaleDateString("es-ES");

      card.innerHTML = `
        <span class="news-date">${fechaFormateada}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.texto}</p>

        <a class="news-link" href="${noticia.link}" target="_blank">
          Llegir més →
        </a>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.error(err));

  fetch("agenda.json")
  .then(res => res.json())
  .then(data => {

    const container = document.querySelector(".agenda-container");

    // ordenar por fecha ascendente
    data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    data.forEach(evento => {

      const fecha = new Date(evento.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short"
      });

      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <div class="event-date">${fecha}</div>

        <div class="event-info">
          <h3>${evento.titulo}</h3>
          <p>${evento.hora} · ${evento.tipo} · ${evento.entrada}</p>

          <a class="event-btn" href="${evento.link}" target="_blank">
            Més informació →
          </a>
        </div>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.error(err));

  /*Programa i Modal */

  document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".cards");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.getElementById("closeModal");

  // 🔹 CARGAR JSON Y CREAR CARDS
  fetch("programa.json")
    .then(res => res.json())
    .then(data => {

      data.forEach(item => {

        // CARD
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${item.titulo}</h3>
          <p>${item.resumen}</p>
          <button class="card-btn">Veure més</button>
        `;

        // BOTÓN ABRE MODAL
        const btn = card.querySelector(".card-btn");

        btn.addEventListener("click", (e) => {
          e.stopPropagation();

          modalTitle.textContent = item.titulo;
          modalText.textContent = item.detalle;

          modal.style.display = "flex";
          document.body.style.overflow = "hidden";
        });

        container.appendChild(card);

      });

    })
    .catch(err => console.log("Error cargando JSON:", err));

  // 🔹 CERRAR MODAL CON X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 🔹 CERRAR MODAL AL HACER CLICK FUERA
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

});
