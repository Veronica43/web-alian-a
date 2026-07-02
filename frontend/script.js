/* =========================
   MENU HAMBURGUESA
========================= */
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


/* =========================
   ANIMACIÓ CARDS
========================= */
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


/* =========================
   NOTÍCIES (BACKEND)
========================= */
fetch("https://web-alian-a.onrender.com/noticies")
  .then(res => res.json())
  .then(data => {

    const container = document.querySelector(".news-container");
    container.innerHTML = "";

    // ordenar per data (més recents primer)
    data.sort((a, b) => new Date(b.data) - new Date(a.data));

    data.forEach(noticia => {

      const card = document.createElement("div");
      card.classList.add("card");

      const fechaFormateada = new Date(noticia.data).toLocaleDateString("es-ES");

      card.innerHTML = `
       <img src="${noticia.imatge}"class="news-img">
        <span class="news-date">${fechaFormateada}</span>
        <h3>${noticia.titol}</h3>
        <p>${noticia.contingut}</p>
       
      `;
         

      container.appendChild(card);
    });

  })
  .catch(err => console.error("Error notícies:", err));


/* =========================
   AGENDA / EVENTS (BACKEND)
========================= */
fetch("https://web-alian-a.onrender.com/events")
  .then(res => res.json())
  .then(data => {

    const container = document.querySelector(".agenda-container");
    container.innerHTML = "";

    // ordenar per data (més proper primer)
    data.sort((a, b) => new Date(a.data) - new Date(b.data));

    data.forEach(evento => {

      const fecha = new Date(evento.data).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short"
      });

      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <div class="event-date">${fecha}</div>

        <div class="event-info">
          <h3>${evento.titol}</h3>
          <p>${evento.descripcio}</p>
          <small>${evento.lloc}</small>
        </div>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.error("Error events:", err));


/* =========================
   PROGRAMA + MODAL (ENCARA JSON)
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".cards");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.getElementById("closeModal");

  fetch("./programa.json")
  .then(res => res.json())
  .then(data => {

      data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${item.titulo}</h3>
          <p>${item.resumen}</p>
          <button class="card-btn">Veure més</button>
        `;

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
    .catch(err => console.log("Error programa:", err));


  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

});