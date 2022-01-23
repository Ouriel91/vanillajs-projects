const wordEl = document.getElementById('word')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const textEl = document.getElementById('text')
const setttingsEl = document.getElementById('settings')
const settingsFormEl = document.getElementById('settings-form')
const settingsBtnEl = document.getElementById('settings-btn')
const endGameContainerEl = document.getElementById('end-game-container')
const difficultyEl = document.getElementById('difficulty')

//declarations
let randomWord = ''
let score = 0
let time = 10

//load difficulty from LS
let diffculty = localStorage.getItem('diffculty') !== null ?
    localStorage.getItem('diffculty') : 'medium'


//work at beginning

//set diffculty
difficultyEl.value = localStorage.getItem('diffculty') !== null ?
    localStorage.getItem('diffculty') : 'medium'

//focus cursor for typing
textEl.focus()

const timeInterval = setInterval(updateTime, 1000)

//add random word to dom
addWordToDOM()

//listeners
textEl.addEventListener('input', (e) => {
    const insertedWord = e.target.value

    if(insertedWord === randomWord){
        addWordToDOM()
        updateScore()

        e.target.value = ''

        //extra time prize for spell correct
        if(diffculty === 'hard'){
            time += 5
        }
        else if(diffculty === 'medium')
        {
            time += 10
        }
        else{
            time += 15
        }

        updateTime()
    }
})

settingsBtnEl.addEventListener('click', () => {
    setttingsEl.classList.toggle('hide')
})

//helper functions
async function getRandomWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1`)
    const data = await response.json()

    return data[0]
}

settingsFormEl.addEventListener('change', (e) => {
    diffculty = e.target.value
    localStorage.setItem('diffculty', diffculty)
})

async function addWordToDOM() {
    randomWord = await getRandomWord()
    wordEl.innerHTML = randomWord
}

function updateScore(){
    ++score
    scoreEl.innerHTML = score
}

function updateTime(){
    --time
    timeEl.innerHTML = time + 's'

    if(0 === time){
        clearInterval(timeInterval)

        gameOver()
    }
}

function gameOver() {
    endGameContainerEl.innerHTML = `
        <h1>Time is over</h1>
        <p>Your final score is ${score} in ${diffculty} mode</p>
        <button onClick="location.reload()">Play again</button>
    `
    endGameContainerEl.style.display = 'flex'
}








