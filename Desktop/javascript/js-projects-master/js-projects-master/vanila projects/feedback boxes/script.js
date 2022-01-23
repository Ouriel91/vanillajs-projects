const ratings = document.querySelectorAll('.rating')
const send_btn = document.getElementById('send')
const panel = document.getElementById('panel')
const ratings_container = document.querySelector('.ratings-container')
let selectedRating = ""

ratings_container.addEventListener('click', (e) => {
    
    //parentNode for enable activityof image clicking
    if(e.target.parentNode.classList.contains('rating')){  
        removeActives()       
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    }
    //activity if we click on the container not the image
    if(e.target.classList.contains('rating')) {
        removeActives()
        e.target.classList.add('active')
        selectedRating = e.target.firstChild.nextElementSibling.nextElementSibling.innerHTML
    }
})

send_btn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank you!</strong>
        <br>
        <strong>Feedbak: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
        `
})

function removeActives(){
    ratings.forEach(rating => rating.classList.remove('active'))
}