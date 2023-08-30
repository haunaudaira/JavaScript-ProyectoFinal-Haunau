
//Implementación etiquetas html desde JS
const h2 = document.createElement(`h2`)
const footer = document.getElementById('footer')
const p = document.createElement('p')
const userNombre = document.getElementById('userActual')


//Etiqueta HTML
h2.classList.add("h2")
h2.textContent = "Agregar Espontaneos"
document.querySelector("#containerh2").appendChild(h2)
p.textContent = "Registro de Turnos Espontáneos"
footer.appendChild(p)
userNombre.innerText = `Hola ${sessionStorage.usuarioActual}▾`
//Fin etiqueta HTML


// Inicia implementación de Fetch
const nombre = document.getElementById('nombre')
const motivo = document.getElementById('motivo')
const hora = new Date().toLocaleTimeString()

document.getElementById('formEspontaneos').addEventListener('submit', function(event) {
    event.preventDefault();

fetch('https://64e9431f99cf45b15fe08eff.mockapi.io/patients', 
{
    method: 'POST',
    body: JSON.stringify({
        nombre: nombre.value,
        motivo: motivo.value,
        hora: new Date().toLocaleTimeString()
    }),
    headers: {
        "Content-Type": "application/json"
    }
})
.then((response) => response.json())
.then((data) => console.log('Turnos Espontaneos:', data))
.catch((error) => console.error(error))
})

//Esta es la funcion que permite imprimir en pantalla los datos cargados en form de manera instantánea
document.getElementById('formEspontaneos').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;                                                  
    const motivo = document.getElementById('motivo').value;
    const hora = new Date().toLocaleTimeString();

    // Objeto JSON con la información
    const formData = { nombre, motivo, hora };

    // Acá obtengo los datos existentes del Local Storage o se crea un nuevo arreglo
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    data.push(formData);
    localStorage.setItem('formData', JSON.stringify(data));
    updateTable();
});



// Function para actualizar la tabla en el DOM
function updateTable() {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = '';

    const formData = JSON.parse(localStorage.getItem('formData')) || [];

    formData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.nombre}</td><td>${item.motivo}</td><td>${item.hora}</td>`;
        dataBody.appendChild(row);
    });
}

// Boton para eliminar los registros de la tabla almacenados en LS
document.getElementById('clearLocalStorage').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Al hacer click en aceptar se borrarán todos los pacientes cargados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7a3b8f',
        cancelButtonColor: '#3b3d8f',
        confirmButtonText: 'Si, eliminar'
    })
    .then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('formData');
            updateTable();
        Swal.fire(
                'Datos eliminados correctamente'
    )}
    })
});

updateTable();

