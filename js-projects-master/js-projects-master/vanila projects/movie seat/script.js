const container = document.querySelector('.container')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const movieTextEl = document.getElementById('movie-text')

let ticket_price = +movieSelect.value

const createScreenAndSeats = () => {
    createScreen()
    createRows()
    seatsEvents()
    populateUI()
    updateSelectedCount()
}

const createScreen = () => {
    const screen = document.createElement('div')
    screen.classList.add('screen')
    container.appendChild(screen)
}

const createRows = () => {
    for (let i = 0; i <6; ++i) {
        const row = document.createElement('div')
        row.classList.add('row')

        seatsRowsCreate(row)

        container.appendChild(row)
    }
}

const seatsRowsCreate = (row) => {
    for (let j = 0; j < 8; ++j) {
        const seat = document.createElement('div')
        seat.classList.add('seat')
        row.appendChild(seat)
    }
}

const seatsEvents = () => {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('seat') 
            && !e.target.classList.contains('occupied')){
            e.target.classList.toggle('selected')   
            
            updateSelectedCount()
        }
    })
}

const updateSelectedCount = () => {
    const selected_seats = document.querySelectorAll('.row .seat.selected');
    const seatsAvailable =  document.querySelectorAll('.row .seat:not(.occupied)')
    const all_seats = document.querySelectorAll('.row .seat')    
    const seatsIndex = [...selected_seats].map(seat => [...seatsAvailable].indexOf(seat))
    
    //set occupied value for premformence - optional
    /*
    const optOcc =[]
    all_seats.forEach((seat,index) => {
        if(!seat.classList.contains('selected')){
            optOcc.push(index);  
        }
    })

    const generate = all_seats[Math.floor(Math.random() * optOcc.length)]
    generate.classList.add('occupied')
    */
    const selectedMovieIndex = localStorage.getItem('selectMovieIndex')
    const movieText = movieSelect[selectedMovieIndex].innerText.split('(')[0] 

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)) //stringfy to array
   
    count.innerText = selected_seats.length
    total.innerText = selected_seats.length * ticket_price

    movieTextEl.innerText = movieText
}

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

const populateUI = () => {
    const selected_seats = JSON.parse(localStorage.getItem('selectedSeats')) //parse to array
    const seatsAvailable =  document.querySelectorAll('.row .seat:not(.occupied)')

    if(selected_seats !== null && selected_seats.length > 0){
        seatsAvailable.forEach((seat, index) => {
            if(selected_seats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    
    const selectedMovieIndex = localStorage.getItem('selectMovieIndex')

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

movieSelect.addEventListener('change', (e) => {
    ticket_price = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

createScreenAndSeats()