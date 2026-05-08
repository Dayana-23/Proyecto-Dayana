const api = "https://api.disneyapi.dev/character?page=1";

async function obtenerDatos(){
    const respuesta = await fetch(api);
    const datos = await respuesta.json();
    return datos.data;
}

function mostrarInicio(){
    document.getElementById("inicio").style.display = "block";
    document.getElementById("contenedor").innerHTML = "";
}

function cambiarInfo(card){
    let info = card.querySelector(".info");

    if(info.style.display === "block"){
        info.style.display = "none";
    }else{
        info.style.display = "block";
    }
}

async function mostrarPersonajes(){
    document.getElementById("inicio").style.display = "none";

    let personajes = await obtenerDatos();
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    personajes.slice(0,12).forEach(personaje => {
        if(personaje.imageUrl){

            let detalle =
                personaje.tvShows?.[0] ||
                personaje.videoGames?.[0] ||
                personaje.films?.[0] ||
                "Disney";

            contenedor.innerHTML += `
                <div class="card" onclick="cambiarInfo(this)">
                    <img src="${personaje.imageUrl}">
                    <h3>${personaje.name}</h3>
                    <p>${personaje.films[0] || "Disney"}</p>

                    <div class="info">
                        <p>Aparece en: ${detalle}</p>
                        <p>Creador: Disney</p>
                    </div>
                </div>
            `;
        }
    });
}

async function mostrarPeliculas(){
    document.getElementById("inicio").style.display = "none";

    let personajes = await obtenerDatos();
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    let peliculas = [];

    personajes.forEach(personaje => {
        personaje.films.forEach(pelicula => {
            if(!peliculas.includes(pelicula)){
                peliculas.push(pelicula);
            }
        });
    });

    peliculas.sort();

    peliculas.forEach(pelicula => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="https://placehold.co/170x200/c084fc/ffffff?text=Disney">
                <h3>${pelicula}</h3>
                <p>Película de Disney</p>
            </div>
        `;
    });
}

async function buscarPersonaje(){
    let nombre = document.getElementById("buscador").value;

    let respuesta = await fetch(
        "https://api.disneyapi.dev/character?name=" + nombre
    );

    let datos = await respuesta.json();

    document.getElementById("inicio").style.display = "none";

    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    datos.data.forEach(personaje => {
        contenedor.innerHTML += `
            <div class="card" onclick="cambiarInfo(this)">
                <img src="${personaje.imageUrl}">
                <h3>${personaje.name}</h3>
                <p>${personaje.films[0] || "Disney"}</p>

                <div class="info">
                    <p>Personalidad: personaje importante y reconocido de Disney.</p>
                </div>
            </div>
        `;
    });
}

document
.getElementById("btnBuscar")
.addEventListener("click", buscarPersonaje);

mostrarInicio();