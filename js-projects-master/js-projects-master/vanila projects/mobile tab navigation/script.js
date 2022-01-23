const content = document.querySelectorAll('.content')
const list = document.querySelectorAll('nav ul li')

list.forEach((item, index) => {
    item.addEventListener('click', () => {

        hideAllImages()
        unActiveMenu()


        item.classList.add('active')
        content[index].classList.add('show')
    })
})

function hideAllImages() {
    content.forEach(item => item.classList.remove('show')) 
}

function unActiveMenu() {
    list.forEach(item => item.classList.remove('active'))
}