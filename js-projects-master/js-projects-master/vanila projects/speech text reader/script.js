const main  = document.querySelector('main')
const voicesElements = document.getElementById('voices')
const textareaEl = document.getElementById('textarea')
const readEl = document.getElementById('read')
const toggleEl = document.getElementById('toggle')
const closeEl = document.getElementById('close')
const textBoxEl = document.querySelector('.text-box')

let voices = []
const message = new SpeechSynthesisUtterance()

getImages()
getVoices()

//listeners
toggleEl.addEventListener('click', () => {
    textBoxEl.classList.add('show')
})

closeEl.addEventListener('click', () => {
    textBoxEl.classList.remove('show')
})

//voices change
speechSynthesis.addEventListener('voiceschanged', getVoices)

voicesElements.addEventListener('change', setVoice)

readEl.addEventListener('click', () => {
    setTextMessage(textareaEl.value)
    speakText()
})

//helper functions
async function getData() {
    const response = await fetch('https://randomuser.me/api/?results=20')
    const data = await response.json()

    return data
}

async function getImages(){
    const data = await getData()
    const results = data.results
    
    results.forEach((item) => {
        const box = document.createElement('div')

        const picture = item.picture.large
        const name = item.name.first + ' ' + item.name.last

        box.classList.add('box')
        box.innerHTML = `
            <img src="${picture}" alt="${name}" />
            <p class="info">${name}</p>
        `
        
        box.addEventListener('click', () => {
            setTextMessage(name)
            speakText()

            box.classList.add('active')
            setTimeout(() => box.classList.remove('active'), 800)
        })
        

        main.appendChild(box)
    }) 
}

function getVoices() {
    voices = speechSynthesis.getVoices()

    voices.forEach(voice => {
        const option = document.createElement('option')

        option.value = voice.name
        option.innerText = `
            ${voice.name} ${voice.lang}
        `

        voicesElements.appendChild(option)
    })
}

function setTextMessage(text) {
    message.text = text
}

function speakText(){
    speechSynthesis.speak(message)
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}