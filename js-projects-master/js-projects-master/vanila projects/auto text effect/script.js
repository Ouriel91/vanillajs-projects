const text = document.getElementById('text')
const speed = document.getElementById('speed')
const show = "WE LOVE MACCABI"

let index = 1
let time = 300 / speed.value

writeText()

function writeText(){

    text.innerText = show.slice(0, index)
    ++index

    if(index > show.length)
    {
        index = 1
    }

    setTimeout(writeText, time)
}

speed.addEventListener('input', (e) => {
    time = 300 / e.target.value
})