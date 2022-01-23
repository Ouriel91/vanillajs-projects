const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document. getElementById('password2')
const formControl = document.querySelectorAll('.form-control')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputsArray = [username, email, password, password2]
    
    checkRequired(inputsArray)
    checkLength(username, 3, 15)
    checkLength(password,6, 25)
    emailValidation(email) 
    passwordsMatch(password, password2)   

    if(sendForm(formControl)) {
        setTimeout(() => window.alert("form send successfully"), 500)
        formCleanup()
    }
})

function checkRequired(inputsArray) {
    inputsArray.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        }
        else{
            showSuccess(input)
        }
    })
}

function checkLength(element, min, max) {
    return (element.value.length >= min && element.value.length <= max) 
        ? showSuccess(element) : 
        showError(element, 
            `${getFieldName(element)} length need to be at least ${min} and not more than ${max} characters`)
}

function emailValidation(element) {
    //regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(element.value.trim())){
        showSuccess(element)
    }
    else{
        showError(element, "Invalid Email")
    }
}

function passwordsMatch(pass1, pass2){
    if(pass1.value !== pass2.value){
        showError(pass2, "passwords do not match")
    }
}

function showError(element, message) {
    const parentElement = element.parentElement
    parentElement.className = "form-control error"

    const small = parentElement.querySelector('small')
    small.innerText = message
}

function sendForm(inputsArray) {

    let correct = true
    inputsArray.forEach(input => {
        if(input.classList.contains('error'))
        {
            console.log('false')
            correct = false
        }
    })

    return correct
}

function formCleanup() {
    username.value = ''
    email.value = ''
    password.value = ''
    password2.value = ''

    formControl.forEach(input => input.classList.remove('success'))
}

function showSuccess(element) {
    const parentElement = element.parentElement
    parentElement.className = "form-control success"
    
    const small = parentElement.querySelector('small')
    small.innerText = ""
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}