import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDo0F_H2G5yvJ8EoUSnnj8SJ-HcGsdSEdA",
  authDomain: "martinez-store.firebaseapp.com",
  projectId: "martinez-store",
  storageBucket: "martinez-store.appspot.com",
  messagingSenderId: "418642143928",
  appId: "1:418642143928:web:89cfe1b52022e84211f7cd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* LOGIN */
window.login = async function () {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    document.getElementById("login-box").style.display = "none";
    document.getElementById("panel").style.display = "block";
    cargarAdmin();
  } catch (e) {
    alert("Error al iniciar sesión");
  }
};

/* SUBIR PRODUCTO */
window.subirProducto = async function () {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const archivo = document.getElementById("imagen").files[0];

  if (!archivo) return alert("Selecciona una imagen");

  const ruta = ref(storage, "productos/" + archivo.name);
  await uploadBytes(ruta, archivo);

  const url = await getDownloadURL(ruta);

  await addDoc(collection(db, "productos"), {
    nombre,
    descripcion,
    precio,
    imagen: url,
    imagenRef: "productos/" + archivo.name
  });

  alert("Producto agregado");
  cargarAdmin();
};

/* LISTAR EN ADMIN */
async function cargarAdmin() {
  const lista = document.getElementById("lista-admin");
  lista.innerHTML = "";

  const datos = await getDocs(collection(db, "productos"));
  datos.forEach((docu) => {
    const d = docu.data();

    lista.innerHTML += `
      <div class="card">
        <img src="${d.imagen}">
        <h3>${d.nombre}</h3>
        <p>${d.descripcion}</p>
        <p>Gs. ${d.precio}</p>

        <button onclick="eliminar('${docu.id}', '${d.imagenRef}')">Eliminar</button>
      </div>
    `;
  });
}

/* ELIMINAR */
window.eliminar = async function (id, imagenRef) {
  await deleteDoc(doc(db, "productos", id));

  const refImg = ref(storage, imagenRef);
  await deleteObject(refImg);

  alert("Producto eliminado");
  cargarAdmin();
};
