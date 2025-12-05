// ================= REGISTRO =================

const form = document.getElementById("formRegistro");
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let usuario = document.getElementById("usuario").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;

        if (!usuario || !email || !password) {
            msg.style.color = "red";
            msg.textContent = "Todos los campos son obligatorios.";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        if (usuarios.some(u => u.email === email)) {
            msg.style.color = "red";
            msg.textContent = "Este correo ya está registrado.";
            return;
        }

        usuarios.push({ usuario, email, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        msg.style.color = "green";
        msg.textContent = "¡Registro exitoso!";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

        form.reset();
    });
}

// ================= LOGIN =================

const formLogin = document.getElementById("formLogin");
const loginMsg = document.getElementById("loginMsg");

if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        let user = usuarios.find(u => u.email === email && u.password === password);

        if (!user) {
            loginMsg.style.color = "red";
            loginMsg.textContent = "Correo o contraseña incorrectos.";
            return;
        }

        localStorage.setItem("usuarioLogeado", user.usuario);

        loginMsg.style.color = "green";
        loginMsg.textContent = "Sesión iniciada correctamente.";

        setTimeout(() => {
            window.location.href = "perfil.html";
        }, 1200);
    });
}

// ================= PERFIL =================

const usuarioPerfil = document.getElementById("usuarioPerfil");

if (usuarioPerfil) {
    let user = localStorage.getItem("usuarioLogeado");

    usuarioPerfil.textContent = user ? user : "No has iniciado sesión.";
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "index.html";
}

