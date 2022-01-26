const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

let cardIndex = 0

//store DOM cards
const cardsEl = []

//store cards data
const cardsData = getCardsData()

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

const setCardsData = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload() // reload the page to see DOM changes
}

const createCards = () => {
    cardsData.forEach((card, index) => createCard(card, index))
}

const createCard = (card, index) => {
    const div = document.createElement('div')
    div.classList.add('card')

    if(index === 0) {
        div.classList.add('active')
    }

    div.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${card.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
                ${card.answer}
            </p>
        </div>
    </div>
    `

    div.addEventListener('click', () => {
        div.classList.toggle('show-answer')
    })

    cardsEl.push(div)

    updateCardNumber()

    cardsContainer.appendChild(div)
}

const updateCardNumber = () => {
    currentEl.innerText = `${cardIndex + 1} / ${cardsEl.length}`
}

nextBtn.addEventListener('click', () => {
    cardsEl[cardIndex].className = "card left"

    ++cardIndex

    nextBtn.children[0].style.color = "black"
    prevBtn.children[0].style.color = "black"

    if(cardIndex >= cardsEl.length - 1) {
        
        cardIndex = cardsEl.length - 1
        nextBtn.children[0].style.color = "white"
    }

    cardsEl[cardIndex].className = "card active"

    updateCardNumber()
})

prevBtn.addEventListener('click', () => {
    cardsEl[cardIndex].className = "card right"

    --cardIndex

    prevBtn.children[0].style.color = "black"
    nextBtn.children[0].style.color = "black" 

    if(cardIndex <= 0) {
        cardIndex = 0
        prevBtn.children[0].style.color = "white"
    }

    cardsEl[cardIndex].className = "card active"

    updateCardNumber()
})

showBtn.addEventListener("click", () => addContainer.classList.add('show'))
hideBtn.addEventListener("click", () => addContainer.classList.remove('show'))

addCardBtn.addEventListener("click", () => {
    const question = questionEl.value
    const answer = answerEl.value

    if(question.trim() && answer.trim()){

        const card = {question, answer}

        createCard(card)

        //cleanup
        questionEl.value = ''
        answerEl.value = ''

        //close
        addContainer.classList.remove('show')
        
        cardsData.push(card)
        setCardsData(cardsData)
    }
    else{
        alert("Please enter question and answer")
    }
})

clearBtn.addEventListener("click", () => {
    localStorage.clear()
    cardsContainer.innerHTML = ''
    window.location.reload() //same as above
})

createCards()