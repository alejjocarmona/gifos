const API_KEY = "kdctgRaWLtLtphkQlfiqi4s1moGXjwFK";
const searchURL = "http://api.giphy.com/v1/gifs/search";
const trendURL = "https://api.giphy.com/v1/gifs/trending?";
let gifCategory = "watchmen";
//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
let suggestionNode = document.querySelectorAll(".suggestions_gif");
let trendingGifContainer = document.querySelector(".trending_gif_container");
let gifs = [];
let gifResults = [];
let gifPage = document.body;
let logo = document.querySelector(".logo");
let searchGlass = document.querySelector(".search-glass");
console.log(gifPage);

// Info tema para mantener colores de acuerdo al tema elegido
function getTheme () {
    currentTheme = localStorage.getItem("theme");
    console.log(currentTheme);
    if (currentTheme == "light-theme") {
        gifPage.setAttribute("class", "light-theme");
        logo.src = "./static/gifOF_logo.png";
        searchGlass.src = "./static/lupa_inactive.svg";
    } else {
        gifPage.setAttribute("class", "dark-theme");
        logo.src = "./static/gifOF_logo_dark.png";
        searchGlass.src = "./static/lupa_inactive_dark.svg";
    }
}

getTheme()

function setTheme (theme) {
    localStorage.setItem("theme", theme);
}

// Dropdown
let dropdownMenu = document.getElementById("dropdownMenu");
console.log(dropdownMenu);
dropdownMenu.addEventListener("click", showThemes);
function showThemes() {
    document.getElementById("themeDropdown").classList.toggle("show");
};

//Cambio de tema
/* Cambio de tema día y cambio de archivos respectivos */
let sailorDayButton = document.querySelector(".sailor-day");
console.log(sailorDayButton);
sailorDayButton.addEventListener("click", sailorDayTheme);
function sailorDayTheme() {
    //poner los if
    gifPage.setAttribute("class", "light-theme");
    setTheme("light-theme");
    logo.src = "./static/gifOF_logo.png";
    searchGlass.src = "./static/lupa_inactive.svg";
}

/* Cambio de tema noche y cambio de archivos respectivos */
let sailorNightButton = document.querySelector(".sailor-night");
console.log(sailorNightButton);
sailorNightButton.addEventListener("click", sailorNightTheme);
function sailorNightTheme() {
    //poner los if
    gifPage.setAttribute("class", "dark-theme");
    setTheme("dark-theme");
    logo.src = "./static/gifOF_logo_dark.png";
    searchGlass.src = "./static/lupa_inactive_dark.svg";
}
/* Intentar modular ya que son la misma función más o menos */

/* Cambiar estado botón de búsqueda */
document.querySelector('.searchbar').addEventListener('input', function () {
    document.getElementById("searchGif").style.color = "#000";
	if (gifPage.classList.contains("light-theme")) {
        document.getElementById("searchButton").setAttribute("class", "searchButton")
		searchGlass.src = "./static/lupa.svg";
	} else {
		document.getElementById("searchButton").setAttribute("class", "searchButton")
		searchGlass.src = "./static/lupa_light.svg";
    }
    inactiveButton();
});

/* Botón de búsqueda inactivo */
function inactiveButton () {
    searchInfo = document.getElementById("searchGif").value;
    if (searchInfo.length == 0) {
        document.getElementById("searchButton").classList.remove("searchButton");
        if (gifPage.classList.contains("light-theme")) {
            searchGlass.src = "./static/lupa_inactive.svg";
        } else {
            searchGlass.src = "./static/lupa_inactive_dark.svg";
        }
    }
}

//Información traída desde la API para incluir en GifOS
const renderSuggestion = async (responseData) => {
    for (let i of suggestionNode.keys()) {
        let suggestionGif = document.createElement("img");
        suggestionGif.className = "suggested";
        suggestionGif.src = await responseData[i].images.fixed_height.url;
        suggestionNode[i].appendChild(suggestionGif);
    }
};

// TRENDING Y RESULTADO DE BUSQUEDA
const renderTrend = async (responseData) => {
    //creación dinámica :)
    for (let i of responseData.keys()) {
        //el div para el gif
        let gifContainer = document.createElement("div");
        gifContainer.className = "trending_gif";
        // el gif
        trendingGif = document.createElement("img");
        trendingGif.className = "oldGif";
        trendingGif.setAttribute("loading", "lazy");
        trendingGif.src = await responseData[i].images.fixed_height.url;
        if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) > 1.8) {
            gifContainer.className = "trending_gif double_gif";      
        }
        //el div para el title
        titleContainer = document.createElement("div");
        titleContainer.className = "trending_gif_title";
        //el título
        title = document.createElement("p");
        //TODO traer título de la API
        title.innerHTML = "#hashstagUno #hashtagDos";
        //agregar las cositas :3
        titleContainer.appendChild(title)
        gifContainer.appendChild(titleContainer);
        gifContainer.appendChild(trendingGif);
        trendingGifContainer.appendChild(gifContainer);
    }
    gifResults = document.querySelectorAll(".oldGif");
    return gifResults;
}

//Organización de gif doble
const renderSearch = async (responseData) => {
    gifs = document.querySelectorAll(".trending_gif");
    for (let i = 0; i < gifResults.length; i++) {
        gifs[i].className = "trending_gif";
        gifResults[i].src = await responseData[i].images.fixed_height.url;
        if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) > 1.77) {
            gifs[i].className = "trending_gif double_gif";
        }
    }
}

//Traer los datos desde la API para búsqueda
const dataApiSearch = async (gifCategory) => {
    let response = await fetch(`${searchURL}?q=${gifCategory}&api_key=${API_KEY}&limit=25`);
    let data = await response.json();
    console.log(data.data);
    return data.data;
}

//Traer datos desde la API para trending inicial
const dataApiTrend = async () => {
    let response = await fetch(`${trendURL}api_key=${API_KEY}&limit=25`);
    let data = await response.json();
    console.log(data.data);
    return data.data;
}

//Capturar los datos

// Búsqueda de gifs
document.getElementById("searchButton").addEventListener("click", function() {
    searchInfo = document.getElementById("searchGif").value;
    if (searchInfo.length > 0) {
        /* tag = document.createElement("a");
        tag.innerHTML = searchInfo;
        trendingGifContainer.appendChild(tag); */
        searchTitle = document.getElementById("trendingTitle");
        searchTitle.innerHTML = (`${searchInfo}:`);
        window.location="index.html#trending";
        dataApiSearch(searchInfo)
            .then((response) => renderSearch(response))
            .catch((error) => console.log(error, "Oh no! algo salió mal :("));
        } else {
            alert("Ingresa un valor para realizar la búsqueda :)");
        }
});

//trending Gifs
dataApiTrend()
    .then((response) => renderTrend(response))
    .catch((error) => console.log(error, "Oh no! algo salió mal :("));

//Random Gifs
dataApiSearch(gifCategory)
        .then((response) => renderSuggestion(response))
        .catch((error) => console.log(error, "Oh no! algo salió mal :("));