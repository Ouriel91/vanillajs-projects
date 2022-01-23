const resultEl = document.getElementById('result')
const clipboardEl = document.getElementById('clipboard')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

const letters_num = 26
const numbers_num = 10
const ascii_start_lowers_num = 97
const ascii_start_uppers_num = 65
const ascii_start_nums = 48

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


clipboard.addEventListener('click', async() => {
    if(!resultEl.innerText){ 
        return 
    }

    await navigator.clipboard.writeText(resultEl.innerText)
    alert('password copied!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumbers = numbersEl.checked
    const hasSymbols = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let retPassword = ''
    const types_num = lower + upper + number + symbol
    const copyArr = []
    const typesArr =[{lower}, {upper}, {number}, {symbol}]
        .filter(type => Object.values(type)[0]) //0 means the object value, and we left all objects with true values
    
    if(0 == types_num){
        return ''
    }

    for(let i = 0; i < length; i += types_num ){
        typesArr.forEach(type => {
            const func = Object.keys(type)[0]
            copyArr.push(func)
        })
    }

    const shuffledArr = shuffleArr(copyArr)

    shuffledArr.forEach(shuffled => {
        retPassword += randomFunc[shuffled]()
    })

    return retPassword
}


function shuffleArr(arr){

    for (let i = arr.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * letters_num) + ascii_start_lowers_num)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * letters_num) + ascii_start_uppers_num)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * numbers_num) + ascii_start_nums)
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}