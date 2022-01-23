const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
]

const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a-text")
const b_text = document.getElementById("b-text")
const c_text = document.getElementById("c-text")
const d_text = document.getElementById("d-text")
const submit = document.getElementById("submit")

let quiz_index = 0
let score = 0

loadQuiz()

function loadQuiz(){

    deselectAllAnswers()

    const current_quiz = quizData[quiz_index]

    questionEl.innerText = current_quiz.question
    a_text.innerText = current_quiz.a
    b_text.innerText = current_quiz.b
    c_text.innerText = current_quiz.c
    d_text.innerText = current_quiz.d
}

function deselectAllAnswers(){
    answerEls.forEach(answer => answer.checked = false)
}

function getSelectedAnswer(){

    let answer = undefined

    answerEls.forEach(answerEl => {
        if (answerEl.checked){
            answer = answerEl.id
        }
    })

    return answer
}

submit.addEventListener('click', () => {
    const answer = getSelectedAnswer()

    if(answer){
        if(answer === quizData[quiz_index].correct){
            ++score
        }
        
        ++quiz_index

        if(quiz_index < quizData.length){
            loadQuiz()
        }
        else{
            quiz.innerHTML = `
                <h2>You answerd ${score} / ${quizData.length} questions correctly</h2>

                <button onClick="location.reload()">Reaload</button>
            `
        }
    }
})