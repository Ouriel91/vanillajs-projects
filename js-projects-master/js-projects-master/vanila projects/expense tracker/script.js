const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = 
    localStorage.getItem('transactions') !== null ? localStorageTransactions : []


init()

form.addEventListener('submit', addTransaction)

function updateLS() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init() {
    list.innerHTML = '' //cleanup

    transactions.forEach(addTransactionDOM)
    updateValues()
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+'
    const addClass = transaction.amount < 0 ? "minus" : "plus"

    const li = document.createElement('li')
    li.classList.add(addClass)

    li.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
        <button 
            class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `

    list.appendChild(li)
}


function updateValues() {
    const newAmounts = transactions.map(transaction => transaction.amount)

    const total_sum = newAmounts.reduce((sum, amount) => (sum += amount),0).toFixed(2)

    const inc_sum = 
        newAmounts.filter(transaction => transaction > 0).
        reduce((sum, amount) => (sum += amount), 0)
        .toFixed(2)

    const exp_sum = (
        newAmounts.filter(transaction => transaction < 0).
        reduce((sum, amount) => (sum += amount), 0) * -1) //make it positive (show later as negative)
        .toFixed(2)
    
    moneyPlus.innerText = `$${inc_sum}`
    moneyMinus.innerText = `$${exp_sum}`
    balance.innerText = `$${total_sum}`
}

function addTransaction(e) {
    e.preventDefault()

    if(text.value.trim() === '' || amount.value.trim() === '')
    {
        alert('Please add text and amount')
    }else{
        const transaction = {id: generateID(), text: text.value, amount: +amount.value}

        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLS()

        text.value = ''
        amount.value = ''
    }
}

function generateID() {
    return Math.floor(Math.random() * 100000000)
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLS()
    init() //re render the DOM
}