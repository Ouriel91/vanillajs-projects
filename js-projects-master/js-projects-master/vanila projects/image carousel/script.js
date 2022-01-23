const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

const images = document.getElementById('imgs')
const image = document.querySelectorAll('#imgs img')

let index = 0

let interval = setInterval(run, 2000)

function run() {
    ++index
    changeImage()
}

function changeImage() {
    if(index > image.length - 1) {
        index = 0;
    }
    else if(index < 0){
        index = image.length - 1
    }

    images.style.transform = `translateX(${-index * 500}px)`
}

leftBtn.addEventListener("click", () => {
    --index
    changeImage()
    resetInterval()
})

rightBtn.addEventListener("click", () => {
    ++index
    changeImage()
    resetInterval()
})

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}