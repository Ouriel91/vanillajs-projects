const msgEl = document.getElementById('msg')

const randomNumber = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition

let recognition = new window.SpeechRecognition()
let num_guesses = 0

recognition.start()

recognition.addEventListener('result',onSpeak)

recognition.addEventListener('end', () => {
    recognition.start()
})

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function onSpeak(e) {
    const msg = e.results[0][0].transcript

    writeMsg(msg)
    checkNumeric(msg)
}

function writeMsg(msg) {
    msgEl.innerHTML = `
    <div>You Said:</div>
    <span class="box">${msg}</span>
    `
}

function checkNumeric(msg) {
    const num = +msg

    if(Number.isNaN(num)) {
        msgEl.innerHTML += `
            <div>Not Valid Number</div>
        `
        return
    }

    if(num > 100 || num < 1) {
        msgEl.innerHTML += `
            <div>Number should be between 1 and 100</div>
        `
        return
    }

    if (num === randomNumber) {
        document.body.innerHTML = `
            <h2>Congrats! The number was ${num} you did it in ${num_guesses + 1} guesses!</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `
        ++num_guesses
    }
    else {
        msgEl.innerHTML += `
            <div>${num > randomNumber ? "Go Lower" : "Go Upper"}</div>
        `
        ++num_guesses
    }
    
}

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again')
    {
        window.location.reload()
    }
})