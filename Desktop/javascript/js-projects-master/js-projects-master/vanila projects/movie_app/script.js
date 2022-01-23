const url_api = config.API_URL
const img_path = config.IMG_PATH
const url_search = config.SEARCH_API

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(url_api)

async function getMovies(url) {

    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {

    main.innerHTML = ""

    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie // destructering
        
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
            <img src="${img_path + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getRateClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    })
}

function getRateClass(vote)
{
    if (vote >= 8) {
        return "green"
    }
    else if (vote >= 5 )
    {
        return "orange"
    }

    return "red"

}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm.length > 0) {
        getMovies(url_search + searchTerm)

        search.value = "" 
    }
    else {
        window.location.reload()
    }
})
