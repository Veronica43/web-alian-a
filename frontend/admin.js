document.addEventListener("DOMContentLoaded", () => {

  const loginBox = document.getElementById("loginBox");
  const panel = document.getElementById("panel");
  const error = document.getElementById("error");

  // 🔹 CHECK SESSIÓ (AMB TOKEN)
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

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      if (data.ok) {

        // 🔥 GUARDEM TOKEN (IMPORTANT)
       sessionStorage.setItem("token", data.token);

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
    fetch("http://localhost:3000/noticies", {
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
    .then(res => res.json())
    .then(data => {
      alert("Notícia creada ✔");
    });
  };

  // 🔹 CREAR EVENT
  window.crearEvent = function () {
    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        titol: document.getElementById("titolEvent").value
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("Event creat ✔");
    });
  };

});