document.addEventListener("DOMContentLoaded", () => {

  const loginBox = document.getElementById("loginBox");
  const panel = document.getElementById("panel");
  const error = document.getElementById("error");

  // 🔹 CHECK SESSIÓ (TOKEN)
  if (localStorage.getItem("token")) {
    loginBox.style.display = "none";
    panel.style.display = "block";
  } else {
    loginBox.style.display = "block";
    panel.style.display = "none";
  }

  // 🔹 LOGIN
  window.login = function () {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    fetch("https://web-alian-a.onrender.com/login", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    })
    .then(res => {
      if (!res.ok) throw new Error("Login incorrecte");
      return res.json();
    })
    .then(data => {
      if (data.ok) {

        // 🔥 GUARDAR TOKEN
        localStorage.setItem("token", data.token);

        // 🔥 MOSTRAR PANEL
        loginBox.style.display = "none";
        panel.style.display = "block";
      }
    })
    .catch(() => {
      error.textContent = "Usuari o password incorrectes";
    });
  };

  // 🔹 LOGOUT
  window.logout = function () {
    localStorage.removeItem("token");
    loginBox.style.display = "block";
    panel.style.display = "none";
  };

  // 🔹 CREAR NOTÍCIA
  window.crearNoticia = function () {
    fetch("https://web-alian-a.onrender.com/noticies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        titol: document.getElementById("titolNoticia").value,
        contingut: document.getElementById("contingutNoticia").value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      alert("Notícia creada ✔");
    })
    .catch(() => {
      alert("Error creant notícia ❌");
    });
  };

  // 🔹 CREAR EVENT
  window.crearEvent = function () {
    fetch("https://web-alian-a.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        titol: document.getElementById("titolEvent").value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      alert("Event creat ✔");
    })
    .catch(() => {
      alert("Error creant event ❌");
    });
  };

});