const apiKey = "d53c88bd";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const toggleThemeButton = document.getElementById("toggleTheme");
const movieInfo = document.getElementById("movieInfo");
const recommendedMovies = document.getElementById("recommendedMovies");
let darkMode = false;

async function fetchMovie(title) {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
    const data = await response.json();
    return data;
}

async function fetchRecommendedMovies() {
    const response = await fetch(`https://www.omdbapi.com/?s=Avengers&apikey=${apiKey}`);
    const data = await response.json();
    return data.Search || [];
}

function displayMovie(data) {
    if (data.Response === "True") {
        movieInfo.innerHTML = `
            <div class="movie">
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Regissør:</strong> ${data.Director}</p>
                <p><strong>Sjanger:</strong> ${data.Genre}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                ${data.Poster ? `<img class="poster" src="${data.Poster}" alt="${data.Title}">` : ''}
            </div>
        `;
    } else {
        movieInfo.innerHTML = `<p>Ingen filmer funnet.</p>`;
    }
}

function displayRecommended(movies) {
    recommendedMovies.innerHTML = movies.map(movie => `
        <div class="movie">
            <h3>${movie.Title} (${movie.Year})</h3>
            ${movie.Poster ? `<img class="poster" src="${movie.Poster}" alt="${movie.Title}">` : ''}
        </div>
    `).join('');
}

const handleSearch = async () => {
    const title = searchInput.value;
    const movieData = await fetchMovie(title);
    displayMovie(movieData);
};

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

toggleThemeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    document.querySelector(".container").classList.toggle("dark-mode", darkMode);
    const movies = document.querySelectorAll(".movie");
    movies.forEach(movie => movie.classList.toggle("dark-mode", darkMode));
});

window.onload = async () => {
    const recommended = await fetchRecommendedMovies();
    displayRecommended(recommended);
};