//Escuchar el click
const boton = document.getElementById("boton");
boton.addEventListener("click", preguntarNombre);

//Guardar referencias a los heading
const h1 = document.getElementById("h1");

//Preguntar y guardar el nombre

function preguntarNombre() {
  const nombre = prompt("Introduce tu nombre");
  mostrarNombre(nombre);
}

//Insertar el nombre donde ahora estan los ...
function mostrarNombre(nombre) {
    h2.textContent = "Hola 😎"
  h1.textContent = nombre;
}
