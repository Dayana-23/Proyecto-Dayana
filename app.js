/*
function hellooo(){
    console.log("Hellooo")
}


function darkMode(){
    console.log("Se activo el darkMode")
    document.body.classList.toggle("dark")
}

function cambio(){
    console.log("Cambio activoooo")
    document.getElementById("titulo").innerHTML = "Blackpink"
}
 */



const resultado = document.getElementById("resultado");

const coloresPokemon = {
  fire: ["#ff6b6b", "#ff0000"],
  water: ["#4dabf7", "#1c7ed6"],
  grass: ["#69db7c", "#2b8a3e"],
  electric: ["#ffd43b", "#fab005"],
  psychic: ["#faa2c1", "#d6336c"],
  ice: ["#a5d8ff", "#74c0fc"],
  dragon: ["#9775fa", "#5f3dc4"],
  dark: ["#495057", "#212529"],
  fairy: ["#fcc2d7", "#f783ac"],
  normal: ["#dee2e6", "#adb5bd"]
};

async function buscarPokemon() {
  const id = Math.floor(Math.random() * 151) + 1;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const datos = await res.json();

  resultado.innerHTML = `
    <h2>${datos.name}</h2>
    <img src="${datos.sprites.front_default}">
    <p>Altura: ${datos.height}</p>
    <p>Peso: ${datos.weight}</p>
  `;

  aplicarEstiloPokemon(datos);
}

function aplicarEstiloPokemon(datos) {
  const tipo = datos.types[0].type.name;
  const colores = coloresPokemon[tipo] || ["#ffd1dc", "#ffffff"];

  const esFemenino = Math.random() > 0.5;
  const card = document.getElementById("resultado");

  if (esFemenino) {
    // 🌸 Colores pastel
    document.body.style.background =
      `linear-gradient(135deg, ${colores[0]}, #ffffff, ${colores[1]})`;
    
    card.style.background = "#ffe4ec";
    card.style.color = "#d6336c";

  } else {
    // 🔥 Colores vibrantes
    document.body.style.background =
      `linear-gradient(135deg, ${colores[1]}, ${colores[0]}, #ff0000)`;

    card.style.background = "#212529";
    card.style.color = "#ffffff";
  }
}
if (esFemenino) {
  document.body.style.background =
    "linear-gradient(135deg, #ffd1dc, #ffe4ec, #ffffff)";

  card.classList.add("card-pastel");
  card.classList.remove("card-strong");

} else {
  document.body.style.background =
    "linear-gradient(135deg, #ff4d4d, #990000, #000000)";

  card.classList.add("card-strong");
  card.classList.remove("card-pastel");
}