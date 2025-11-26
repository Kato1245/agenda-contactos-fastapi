async function cargar() {
  let datos = await fetch("http://127.0.0.1:8000/api/v1/lista")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("Contactos", JSON.stringify(data));

      window.location.reload();
    })
    .catch(function errorx(error) {
      console.error("Error cargando contactos:", error);
      return false;
    });
  return datos;
}

window.onload = async function () {
  if (localStorage.getItem("Contactos")) {
    let contactos = JSON.parse(localStorage.getItem('Contactos'));

    let tablx = document.getElementById("tbDatos");
    tablx.innerHTML = '';

    for (let x in contactos) {
      cont = contactos[x];

      tr = document.createElement('tr');
      
      td = document.createElement('td');
      td.innerHTML = cont.id || '';
      tr.appendChild(td);
      
      td = document.createElement('td');
      td.innerHTML = cont.nombre || '';
      tr.appendChild(td);
      
      td = document.createElement('td');
      td.innerHTML = cont.correo || '';
      tr.appendChild(td);
      
      td = document.createElement('td');
      td.innerHTML = cont.telefono || '';
      tr.appendChild(td);

      td = document.createElement('td');
      btnEliminar = document.createElement('button');
      btnEliminar.setAttribute('class', 'btn btnEliminar btn-danger');
      btnEliminar.innerHTML = "Eliminar";
      btnEliminar.setAttribute('onclick', `eliminarFila(this, ${cont.id})`);
      td.appendChild(btnEliminar);
      tr.appendChild(td);
      
      tablx.appendChild(tr);
    }
  } else {
    alert("No hay datos en el local storage");
  }
};

async function agregarContacto() {
  cont = {};
  cont.nombre = document.getElementById('nombre').value;
  cont.correo = document.getElementById('email').value;
  cont.telefono = document.getElementById('telefono').value;

  url = "http://127.0.0.1:8000/api/v1/agregar";

  await eviarDatos(url, cont);
}

async function eliminarFila(btnEliminar, id) {
  await fetch(`http://127.0.0.1:8000/api/v1/eliminar/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {
      fila = btnEliminar.parentNode.parentNode;
      fila.parentNode.removeChild(fila);
    } else {
      alert("Error al eliminar el contacto");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Error al eliminar el contacto");
  });
}

async function eviarDatos(url, datos) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}