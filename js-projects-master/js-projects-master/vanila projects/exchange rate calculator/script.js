const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_one = document.getElementById('amount-one')
const amountEl_two = document.getElementById('amount-two')
const rateEl = document.getElementById('rate')
const swapEl = document.getElementById('swap')

const api_url = "https://open.exchangerate-api.com/v6/latest"

async function getDataAndCalculate() {
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value

    const response = await fetch(api_url)
    const data = await response.json()

    const rate = data.rates[currency_two] / data.rates[currency_one]
    rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(2)} ${currency_two}`
    amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
}

currencyEl_one.addEventListener('change',getDataAndCalculate)
currencyEl_two.addEventListener('change',getDataAndCalculate)
amountEl_one.addEventListener('input',getDataAndCalculate)
amountEl_two.addEventListener('input',getDataAndCalculate)

swapEl.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    getDataAndCalculate()
})

getDataAndCalculate() 

