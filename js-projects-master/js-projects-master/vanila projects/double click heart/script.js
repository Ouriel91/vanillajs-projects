const loveMe = document.querySelector('.loveMe')
const times = document.getElementById('times')

let times_counter = 0
let click_time = 0

loveMe.addEventListener('click', (e) => {
    if(click_time === 0) {
        click_time = new Date().getTime()
    }
    else{
        //we create kind of double click by short different of two clicks 
        if((new Date().getTime() - click_time) < 800){
            createHeart(e)
            click_time = 0
        }
        else{
            click_time = new Date().getTime()
        }
    }
})

const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.left = `${xInside}px`
    heart.style.top = `${yInside}px`

    loveMe.appendChild(heart)

    times.innerText = ++times_counter

    setTimeout(() => heart.remove(), 1000)
}