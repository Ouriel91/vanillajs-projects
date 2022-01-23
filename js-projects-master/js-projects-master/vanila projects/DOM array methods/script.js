const main = document.getElementById('main')
const add_user = document.getElementById('add-user')
const double = document.getElementById('double')
const show_millionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const calculate_wealth = document.getElementById('calculate-wealth')

let data = []

const api_url = 'https://randomuser.me/api'

getRandomUser()
getRandomUser()
getRandomUser()

async function getRandomUser() {
    const response = await fetch(api_url)
    const data = await response.json()

    const user = data.results[0]

    const user_obj = {
        name: `${user.name.first + ' ' + user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addUser(user_obj)
}

function addUser(user){
    data.push(user)

    updateDOM()
}


function updateDOM(prevData = data) {

    //cleanup
    main.innerHTML = `
        <h2><strong>Person</strong>Wealth</h2>
    `
    //for each travers the array elements 
    prevData.forEach(user => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `
            <strong>${user.name}</strong> ${moneyFormat(user.money)}
        `
        main.appendChild(element)
    })
}

function moneyFormat(money) {
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//map creates new array 
function doubleMoney(){
    const newArr = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    })

    data = newArr

    updateDOM();
}

//sort sort the elements in place
function sortByRichest(){

    data = data.sort((a, b) => {
        return b.money - a.money
    })

    updateDOM()
}

//filter returns new array
function showMillionaires() {
    const newArr = data.filter(user => user.money >= 1000000)

    data = newArr

    updateDOM()
}

//reduce returns value
function calculateWealth() {
    const total_wealth = data.reduce((acc, user) => (acc += user.money),0) //0 is the initial value

    console.log('hi')
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `
        <h3>Total Wealth: <strong>${moneyFormat(total_wealth)}</strong><h3>
    `
    main.appendChild(wealthEl)
}

add_user.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
show_millionaires.addEventListener('click', showMillionaires)
calculate_wealth.addEventListener('click', calculateWealth)