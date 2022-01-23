const body = document.body
const slides = document.querySelectorAll('.slide')
const l_arrow = document.getElementById('left')
const r_arrow = document.getElementById('right')

let index_slide = 0

setBodyBG()

function setBodyBG(){
    body.style.backgroundImage = slides[index_slide].style.backgroundImage
}

function setSlideActive(){
    //cleanup
    slides.forEach(slide => {
        slide.classList.remove('active')
    })

    slides[index_slide].classList.add('active')
}

l_arrow.addEventListener('click', () => {
    
    --index_slide

    if (index_slide < 0) {
        index_slide = slides.length - 1;
    }
    setBodyBG()
    setSlideActive()
})

r_arrow.addEventListener('click', () => {

    ++index_slide;

    if (index_slide > slides.length - 1) {
        index_slide = 0;
    }

    setBodyBG()
    setSlideActive();
})