//initials
const section = document.querySelector('section')
const lives = document.getElementById('lives')
let gameLives = 6

const getData = () => 
[
    { src: "./img/captain.jpg", id: 1, name: "captain" },
    { src: "./img/caricature.jpg", id: 2, name: "caricature" },
    { src: "./img/symbole.jpeg", id: 3, name: "symbole" },
    { src: "./img/champions2011.jpg", id: 4, name: "champoins2011" },
    { src: "./img/champions2021.jpg", id: 5, name: "champions2021" },
    { src: "./img/coach.jpeg", id: 6, name: "coach" },
    { src: "./img/fans.jpg", id: 7, name: "fans" },
    { src: "./img/poster.jpg", id: 8, name: "poster" },
    { src: "./img/captain.jpg", id: 9, name: "captain" },
    { src: "./img/caricature.jpg", id: 10, name: "caricature" },
    { src: "./img/symbole.jpeg", id: 11, name: "symbole" },
    { src: "./img/champions2011.jpg", id: 12, name: "champoins2011" },
    { src: "./img/champions2021.jpg", id: 13, name: "champions2021" },
    { src: "./img/coach.jpeg", id: 14, name: "coach" },
    { src: "./img/fans.jpg", id: 15, name: "fans" },
    { src: "./img/poster.jpg", id: 16, name: "poster" },
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)

    return cardData
}

const cardGenerator = () => {
    const cardData = randomize()
    
    cardData.forEach(item => {
        const card = document.createElement("div")

        card.classList.add("card")
        card.setAttribute("id", item.id)
        card.setAttribute("name", item.name)

        card.innerHTML = `
            <img class="face" src="${item.src}" alt="${item.name}" />
            <div class="back"></div>
        `
        section.appendChild(card)

        
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard")
            checkCards(e)
        })
        
    })
}

const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll(".flipped")
    const toggleCards = document.querySelectorAll(".toggleCard")

    //prevent form flipp more than 2 cards
    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name"))
        { 
            flippedCards.forEach(card => {
                //clear the 2 correct cards
                card.classList.remove('flipped') 
                card.style.pointerEvents = "none"
            })
        }
        else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            })

            --gameLives
            lives.textContent = gameLives

            if(gameLives === 0){
                restartGame("Loser!!!")      
            }
        }
    }

    if(toggleCards.length === 16){
        restartGame("Winner!!!")
    }
}

const restartGame = (text) => {
    setTimeout(() => window.alert(text) , 1000)
    setTimeout(() => window.location.reload() , 1000)
}

cardGenerator()

lives.textContent = gameLives