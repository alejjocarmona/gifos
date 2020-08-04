const API_KEY = "kdctgRaWLtLtphkQlfiqi4s1moGXjwFK";
const URL = "http://api.giphy.com/v1/gifs/search?";
let gifCategory = "watchmen";
//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
let suggestionNode = document.querySelectorAll(".suggestions_gif");
let trendingNode = document.querySelectorAll(".trending_gif");
let gifResults = [];

//Información traída desde la API para incluir en GifOS
const renderSuggestion = async (responseData) => {
    for (let i of suggestionNode.keys()) {
        let suggestionGif = document.createElement("img");
        suggestionGif.src = await responseData[i].images.fixed_height.url;
        suggestionNode[i].appendChild(suggestionGif);
    }
    console.log(suggestionNode);
};

// TRENDING Y RESULTADO DE BUSQUEDA
const renderTrend = async (responseData) => {
    for (let i of trendingNode.keys()) {
        let trendingGif = document.createElement("img");
        trendingGif.className = "oldGif";
        trendingGif.src = await responseData[i].images.fixed_height.url;
        trendingNode[i].appendChild(trendingGif);
    }
    gifResults = document.querySelectorAll(".oldGif");
    return gifResults;
}

const renderSearch = async (responseData) => {
    for (let i = 0; i < gifResults.length; i++) {
        gifResults[i].src = await responseData[i].images.fixed_height.url;
    }
}

//Traer los datos desde la API
const dataApi = async (gifCategory) => {
    let response = await fetch(`${URL}q=${gifCategory}&api_key=${API_KEY}&limit=10`);
    let data = await response.json();
    console.log(data.data);
    return data.data;
}

//Capturar los datos

// Búsqueda de gifs
document.getElementById("searchButton").addEventListener("click", function() {
    searchInfo = document.getElementById("searchGif").value;
    searchTitle = document.getElementById("trendingTitle");
    searchTitle.innerHTML = (`${searchInfo}:`);
    window.location="index.html#trending";
    dataApi(searchInfo)
        .then((response) => renderSearch(response))
        .catch((error) => console.log(error, "Oh no! algo salió mal :("));
});

//TODO remover srcs y poner los nuevos

//trending Gifs
dataApi()
    .then((response) => renderTrend(response))
    .catch((error) => console.log(error, "Oh no! algo salió mal :("));

//Random Gifs
dataApi(gifCategory)
        .then((response) => renderSuggestion(response))
        .catch((error) => console.log(error, "Oh no! algo salió mal :("));