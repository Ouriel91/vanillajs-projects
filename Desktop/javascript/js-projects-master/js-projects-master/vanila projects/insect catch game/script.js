const screens = document.querySelectorAll('.screen')
const choose_insect_btn = document.querySelectorAll('.choose-insect-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insect_btn.forEach(insect => {
    insect.addEventListener('click', () => {
        const img = insect.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = {src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect,1000)
        startGame()
    })
})

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {x, y} = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `
        <img 
            src="${selected_insect.src}" 
            alt="${selected_insect.alt}"
            style="transform:rotate(${Math.random() * 360}deg)" />
    `
    insect.addEventListener('click', catchInsect)
    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100 // not close enough to edge
    const y = Math.random() * (height - 200) + 100 

    return {x, y}
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught') //add to item that pressed
    setTimeout(() => this.remove(), 2000) //remove from screen
    addInsects()
}

function increaseScore() {
    ++score

    if(score > 19){
        messageEl.classList.add('visible')
    }

    scoreEl.innerHTML = `Score: ${score}`
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let min = Math.floor(seconds / 60)
    let sec = seconds % 60

    min = min < 10 ? `0${min}` : min
    sec = sec < 10 ? `0${sec}` : sec

    timeEl.innerHTML = `Time: ${min}:${sec}`

    ++seconds
}