const container = document.getElementById('container')
const text = document.getElementById('text')

const total_time = 7500 //7.5s

const breathe_time = 3000
const hold_time = 1500 

function breatheAnimation() {
    text.innerText= "Breathe In!"
    container.className="container grow"

    //timout - wait and execute what inside
    setTimeout(() => {

        text.innerText= "Hold Breathe!"
        
        setTimeout(() => {
            text.innerText= "Breathe Out!"
            container.className="container shrink"
        }, hold_time)
    },breathe_time)
}

breatheAnimation()

setInterval(breatheAnimation, total_time)