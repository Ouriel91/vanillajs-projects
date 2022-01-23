const form = document.getElementById('form')
const input = document.getElementById('input')
const todos_list = document.getElementById('todos')

//retrive todos from local storage (if exist)
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(todo => {
        addTodo(todo)
    })
}

//main functionality
form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) { //has an *option* to take single todo 
    let todoText = input.value

    if(todo){
        todoText = todo.text
    }

    if(todoText){
        const todoEl = document.createElement('li')

        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => { //right click
            e.preventDefault()

            todoEl.remove()
            updateLS()

        })

        todos_list.appendChild(todoEl)

        input.value = ""

        updateLS()
    }
}

//save in loacl storage
function updateLS() {
    todosEl = document.querySelectorAll('li')
    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,            
            completed: todoEl.classList.contains('completed')
        }) //push object
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
