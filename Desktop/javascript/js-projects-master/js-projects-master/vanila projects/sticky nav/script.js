const nav = document.querySelector('.nav')

window.addEventListener('scroll', fixedNav)

function fixedNav() {
    if(window.scrollY > nav.offsetHeight + 100) { //after x pixels of scolling below the navigation add class
        nav.classList.add('active')
    }else{
        nav.classList.remove('active')
    }
}