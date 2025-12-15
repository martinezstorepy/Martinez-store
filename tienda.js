const contenedor = document.getElementById("productos");

let productos = JSON.parse(localStorage.getItem("productos")) || [];

if (productos.length === 0) {
  contenedor.innerHTML = "<p>No hay remeras cargadas.</p>";
}

productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";

  div.innerHTML = `
    <img src="${p.imagen}">
    <h3>${p.nombre}</h3>
    <p>Gs. ${p.precio}</p>
    <a class="btn" href="https://wa.me/595982352177?text=Hola,%20quiero%20la%20remera%20${encodeURIComponent(p.nombre)}" target="_blank">
      Comprar
    </a>
  `;

  contenedor.appendChild(div);
});
