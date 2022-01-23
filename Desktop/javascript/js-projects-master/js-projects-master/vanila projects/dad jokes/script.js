const joke = document.getElementById('joke')
const btn = document.getElementById('btn')

btn.addEventListener('click', generateJoke)

generateJoke()

//use async await
async function generateJoke() {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    const res = await fetch('https://icanhazdadjoke.com', config)

    const data = await res.json()
        
    joke.innerHTML = data.joke
}

//use fetch with then conacatinating
/*
function generateJoke() {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    fetch('https://icanhazdadjoke.com', config)
        .then(response => response.json())
        .then(data => {
            joke.innerHTML = data.joke
        })
}
*/