const slider_container = document.querySelector('.slider-container')
const left_slide = document.querySelector('.left-slide')
const right_slide = document.querySelector('.right-slide')
const up_button = document.querySelector('.up-button')
const down_button = document.querySelector('.down-button')
const all_slides = right_slide.querySelectorAll('div').length

let index = 0

left_slide.style.top = `-${(all_slides - 1)*100}vh`

up_button.addEventListener('click', () => changSlide('up'))

down_button.addEventListener('click', () => changSlide('down'))


function changSlide(direction) {

    const slideHight = slider_container.clientHeight

    if('up' === direction)
    {
        ++index

        if(index > all_slides - 1)
        {
            index = 0;
        }
    }
    else if('down' === direction){
        --index

        if(index < 0){
            index = all_slides - 1
        }
    }

    right_slide.style.transform = `translateY(-${index  * slideHight}px)`
    left_slide.style.transform = `translateY(${index  * slideHight}px)`

}