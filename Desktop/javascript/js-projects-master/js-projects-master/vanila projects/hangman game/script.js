const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainButtonEl = document.getElementById('play-again')
const popupContainerEl = document.getElementById('popup-container')
const notificationContainer = document.getElementById('notification-container')
const finalMessageEl = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')
const correctLetters = []
const wrongLetters = []
let cpyWord = '' //global variable for functions

const getRandomWord = async () => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
    const data = await response.json()

    return data[0]
}

const chooseWordAndCheck = async () => {
    const word = await getRandomWord()
    cpyWord = word
    console.log(cpyWord);
    checkWord(word)
    checkIfGameWon(word)
    
}

const checkWord = (word) => {
    
    wordEl.innerHTML = `
        ${word
            .split('') //The split() method divides a String into an ordered list of substrings
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
            .join('') //The join() method creates and returns a new string by concatenating all of the elements in an array
        }
    `
}

const checkIfGameWon = (word) => {
    
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    if(innerWord === word){
        finalMessageEl.innerText = `Congratulations! You won! 😃\nThe word was ${cpyWord}`
        popupContainerEl.style.display = 'flex'
    }
} 

window.addEventListener('keydown', (e) => {
    const key = e.key

    if((key >= 'a' && key <= 'z')){
        const letter = key.toLowerCase()

        if(cpyWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                checkWord(cpyWord)
                checkIfGameWon(cpyWord)
            }
            else{
                showNotification()
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLettersEl()
            }
            else{
                showNotification()
            }
        }
    }
})

const showNotification = () => {
    notificationContainer.classList.add('show')

    setTimeout(() => {
        notificationContainer.classList.remove('show')
    }, 2000)
}

const updateWrongLettersEl = () => {
    
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    hangmanAddPart()
    checkIfGameLost()
}

const hangmanAddPart = () => {

    figureParts.forEach((part, index) => {

        if(index < wrongLetters.length){
            part.style.display = 'block'
        }
        else {
            part.style.display = 'none'
        }
    })
}

const checkIfGameLost = () => {
    if(wrongLetters.length === figureParts.length){
        finalMessageEl.innerText = `Unfortunately you lost. 😕\n The word was ${cpyWord}.`;
        popupContainerEl.style.display = 'flex'
    }
}


playAgainButtonEl.addEventListener('click', () => {
    restartGame()
})

const restartGame = () => {
    //initial anything again
    correctLetters.splice(0) //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
    wrongLetters.splice(0)
    
    //new word initial again
    chooseWordAndCheck()

    //update wrong letters UI
    updateWrongLettersEl()

    //remove popup
    popupContainerEl.style.display = 'none'
}

chooseWordAndCheck()