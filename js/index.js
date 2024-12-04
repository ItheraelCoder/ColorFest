const colorPalette = document.getElementById("color-palette");
const addColorButton = document.getElementById("add-color");
const title = document.getElementById("title-color");
const topColor = document.getElementById("top-color")
//listado de rutas de los audios
let rutas = ['./assets/audios/1.mp3', './assets/audios/2.mp3', './assets/audios/3.mp3', './assets/audios/4.mp3',
  './assets/audios/5.mp3', './assets/audios/6.mp3', './assets/audios/7.mp3', './assets/audios/8.mp3', './assets/audios/9.mp3'
  , './assets/audios/10.mp3', './assets/audios/11.mp3', './assets/audios/12.mp3', './assets/audios/13.mp3', './assets/audios/14.mp3',
  './assets/audios/15.mp3', './assets/audios/16.mp3', './assets/audios/17.mp3', './assets/audios/18.mp3'];

//lista vacia para almacenar las veces que un color es seleccionado
votos = []

// Función para generar un color aleatorio
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Función para crear un nuevo cuadro de color
function createColorBox() {

  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = getRandomColor();


  colorBox.addEventListener("click", () => {
    navigator.clipboard.writeText(colorBox.style.backgroundColor)
    navigator.clipboard.readText().then(function (text) {
      votos.push(text);
      // topColors();
    });

    //agregar un audio aleatorio cada vez que se de clic sobre los colores
    const audio = new Audio(rutas[Math.floor(Math.random() * 18)]);

    // Reproducir
    audio.play();
    title.style.color = colorBox.style.backgroundColor;
  });

  colorPalette.appendChild(colorBox);

}

// Función para refrescar la paleta de colores
function refreshColorPalette() {
  // Eliminar todos los cuadros de color existentes
  while (colorPalette.firstChild) {
    colorPalette.removeChild(colorPalette.firstChild);
  }

  // Generar 9 nuevos cuadros de color
  for (let i = 0; i < 9; i++) {
    createColorBox();
  }
}

// funcion para contar cuantas veces se repite un color en la lista de votos
function contarFrecuencias(array) {
  return array.reduce((contador, color) => {
    contador[color] = (contador[color] || 0) + 1;
    return contador;
  }, {})
};

// funcion para ordernar la lista de mayor a menor
function ordenarFrecuencia(frecuencia) {
  // Convertir el objeto a un array de pares clave-valor
  let entradas = Object.entries(frecuencia);

  // Ordenar el array de pares clave-valor por el valor (frecuencia), de mayor a menor
  entradas.sort((a, b) => b[1] - a[1]);

  // Convertir el array ordenado de vuelta a un objeto
  let frecuenciaOrdenada = Object.fromEntries(entradas);

  return frecuenciaOrdenada;
}

// funcion para agregar el top de los colores mas seleccionados
function topColors(i) {

  if (topColor.children.length >= 10) {
    return; // Límite de 5 colores alcanzado
  }
  let frecuencia = contarFrecuencias(votos);
  ordenarFrecuencia(frecuencia);

  const topColorbox = document.createElement("div");
  const parrafoContar = document.createElement("h5");
  topColorbox.classList.add("color-box");
  parrafoContar.classList.add("m-auto");

  topColorbox.style.backgroundColor = Object.keys(frecuencia)[i];
  parrafoContar.textContent = Object.values(frecuencia)[i];
  topColor.appendChild(topColorbox);
  topColor.appendChild(parrafoContar);

}

// Crear 9 cuadros de color al cargar la página
for (let i = 0; i < 9; i++) {
  createColorBox();
}

// Agregar evento de clic al botón "Agregar Color"
addColorButton.addEventListener("click", createColorBox);

// Refrescar la paleta de colores cada 10 segundos, a menos que se interactúe con un elemento
let lastInteractionTime = 0;
setInterval(() => {
  const currentTime = Date.now();
  if (currentTime - lastInteractionTime >= 10000) {
    refreshColorPalette();
    for (let i = 0; i < votos.length; i++) {
      topColors(i);
    }
  }
}, 10000);



// Registrar la última interacción del usuario
colorPalette.addEventListener("click", () => {
  lastInteractionTime = Date.now();
});

addColorButton.addEventListener("click", () => {
  lastInteractionTime = Date.now();
});