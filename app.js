const api = "https://api.disneyapi.dev/character?page=1";

async function obtenerDatos(){
    try{
        const respuesta = await fetch(api);
        const datos = await respuesta.json();
        return datos.data;
    }catch(error){
        console.log("Error al cargar API", error);
    }
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
   <p>Películas: ${personaje.films.length}</p>
   <p>Series: ${personaje.tvShows.length}</p>
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
    let nombre = document.getElementById("buscador").value
        .trim()
        .toLowerCase();

    document.getElementById("inicio").style.display = "none";

    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    let personajes = await obtenerDatos();

    let resultados = personajes.filter(personaje =>
        personaje.name.toLowerCase().includes(nombre)
    );

    if(resultados.length === 0){
        contenedor.innerHTML = "<p>No se encontró el personaje ✨</p>";
        return;
    }

    resultados.forEach(personaje => {

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
                    <p>Películas: ${personaje.films.length}</p>
                    <p>Series: ${personaje.tvShows.length}</p>
                </div>
            </div>
        `;
    });
}
document
.getElementById("btnBuscar")
.addEventListener("click", buscarPersonaje);

mostrarInicio();
function mostrarInicio(){
    document.getElementById("inicio").style.display = "block";
    document.getElementById("contenedor").innerHTML = "<h2>CAMBIO NUEVO ✨</h2>";
}
