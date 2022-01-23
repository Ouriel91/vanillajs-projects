const canvas = document.getElementById('canvas')
const increase = document.getElementById('increase')
const decrease = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')

const context = canvas.getContext('2d')

let size = 10
let color = 'black'
let x = undefined
let y = undefined
let isPress = false

canvas.addEventListener('mousedown', (e) => {
    isPress = true

    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
    isPress = false

    x = undefined
    y = undefined 
})

canvas.addEventListener('mousemove', (e) => {
    if(isPress) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x,y,x2,y2) //keep that no circles drawed

        //move to next location
        x = x2
        y = y2
    }
})

function drawCircle(x,y) {
    context.beginPath()
    context.arc(x,y,size,0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
}

function drawLine(x1,y1, x2,y2) {
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.strokeStyle = color
    context.lineWidth = size * 2 //equal it to line of circle
    context.stroke()
}

colorEl.addEventListener('change', (e) => {
    color = e.target.value
})

increase.addEventListener('click', () => {
    if(size < 50)
    {
        size += 5
        sizeEl.innerText = size
    }
})

decrease.addEventListener('click', () => {
    if(size > 5){
        size -= 5
        sizeEl.innerText = size
    }
})

clearEl.addEventListener('click', () => {
    context.clearRect(0,0, canvas.width, canvas.height)
})