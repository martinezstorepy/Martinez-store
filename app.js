// ================= LOGIN =================
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("admin", "true");
    mostrarPanel();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function logout() {
  localStorage.removeItem("admin");
  location.reload();
}

function mostrarPanel() {
  document.getElementById("login").style.display = "none";
  document.getElementById("panel").style.display = "block";
  cargarLista();
}

if (localStorage.getItem("admin") === "true") {
  mostrarPanel();
}

// ================= PRODUCTOS =================
function agregarProducto() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.push({
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    talle: document.getElementById("talle").value,
    img: document.getElementById("imagen").value
  });

  localStorage.setItem("productos", JSON.stringify(productos));
  cargarLista();
}

function cargarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.forEach(p => {
    lista.innerHTML += `<p>${p.nombre} - ${p.talle} - ${p.precio} Gs</p>`;
  });
}

// ================= TIENDA =================
const catalogo = document.getElementById("catalogo");

if (catalogo) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.forEach(p => {
    catalogo.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.nombre}</h3>
        <p>${p.precio} Gs</p>
        <p>Talle: ${p.talle}</p>
        <a href="https://wa.me/595982352177?text=Hola, quiero la remera ${p.nombre} talle ${p.talle}">
          Comprar por WhatsApp
        </a>
      </div>
    `;
  });
}
