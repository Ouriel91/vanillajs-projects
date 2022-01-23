const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let activeIndex = 1

next.addEventListener('click', () => {

    if(activeIndex < circles.length) {
        ++activeIndex
    }

    updateProgress()
})

prev.addEventListener('click', () => {

    if(activeIndex > 0) {
        --activeIndex
    }

    updateProgress()
})

function updateProgress() {

    circles.forEach((circle, index) => {
        
        if (index < activeIndex) {
            circle.classList.add("active");
        }
        else{
            circle.classList.remove("active")
        }
    })

    const actives = document.querySelectorAll('.active')

    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%'

    if(1 === activeIndex)
    {
        prev.disabled = true
    }
    else if(activeIndex == circles.length)
    {
        next.disabled = true
    }
    else{
        prev.disabled = false
        next.disabled = false
    }
}