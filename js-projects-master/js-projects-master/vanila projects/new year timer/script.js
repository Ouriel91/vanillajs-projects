
const daysElement = document.getElementById("days")
const minsElement = document.getElementById("minutes")
const hoursElement = document.getElementById("hours")
const secondsElement = document.getElementById("seconds")
const yearElement = document.getElementById("year")
const countdownElement = document.getElementById("countdown")
const loading = document.getElementById("loading")

function countdown()
{
    const startYearDay = new Date
        (`January 01 ${new Date().getFullYear() + 1} 00:00:00`); //get the first day of the next year
    const thisDay = new Date();

    const secondsTotal = (startYearDay - thisDay) / 1000

    const days = Math.floor(secondsTotal / 3600 / 24)
    const hours = Math.floor(secondsTotal / 3600) % 24
    const mins = Math.floor(secondsTotal / 60) % 60
    const seconds =  Math.floor(secondsTotal) % 60
    
    daysElement.innerHTML = days
    minsElement.innerHTML = formatTime(mins)
    hoursElement.innerHTML = formatTime(hours)
    secondsElement.innerHTML = formatTime(seconds)

    yearElement.innerHTML = new Date().getFullYear() + 1
}

function formatTime(time){
    return time < 10 ? '0' + time : time
}

setTimeout(() => {
    console.log('hi')
    loading.remove()
    countdownElement.style.display = 'flex'
}, 1000)

setInterval(countdown, 1000)
