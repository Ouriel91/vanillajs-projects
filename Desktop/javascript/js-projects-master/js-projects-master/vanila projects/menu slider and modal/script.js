const toggleEl = document.getElementById('toggle')
const openEl = document.getElementById('open')
const modalEl = document.getElementById('modal')
const closeEl = document.getElementById('close')

const nameEl = document.getElementById('name')
const emailEl = document.getElementById('email')
const passwordEl = document.getElementById('password')
const password2El = document.getElementById('password2')
const formEl = document.getElementById('form')

toggleEl.addEventListener("click", () => {
    document.body.classList.toggle('show-nav')
})

openEl.addEventListener("click", () => {
    modalEl.classList.add('show-modal')
})

closeEl.addEventListener("click", () => {
    modalEl.classList.remove('show-modal')
})

//close modal with click outside modal
window.addEventListener("click", (e) => {
    e.target == modalEl ?  modalEl.classList.remove('show-modal') : false
})

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    modalEl.classList.remove('show-modal')

    alert('Name: ' + nameEl.value + '\n' + 'Email: ' + emailEl.value + '\n' + 
        'Passwords are ' + (passwordEl.value === password2El.value ? "Equals" : "Not Equals") + '\n') 
    
    nameEl.value = ""
    emailEl.value = ""
    passwordEl.value = ""
    password2El.value = ""
})