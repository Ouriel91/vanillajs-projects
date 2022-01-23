const draggableList = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check-btn')

const richestPeopleOrdered = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

const listItems = []

let dragStartIndex

createList()

checkBtn.addEventListener('click', () => {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.person-name').innerText.trim()
        if(personName !== richestPeopleOrdered[index])
        {
            item.classList.add('wrong')
            item.classList.remove('right')
        }
        else{
            item.classList.remove('wrong')
            item.classList.add('right')
        }
    })
})

function createList(){

    //use speed operator to create a copy list
    [...richestPeopleOrdered]
    //The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
    .map(val => ({value: val, sort: Math.random()})) 
    .sort((a, b) => a.sort - b.sort) //sort original array with comapre function
    .map(val => val.value)
    .forEach((item, index) => {
        const rich = document.createElement('li')

        //The data-* attribute is used to store custom data private to the page or application.
        //The data-* attribute gives us the ability to embed custom data attributes on all HTML elements.
        rich.setAttribute("data-index", index)
        rich.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${item}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `

        listItems.push(rich)

        draggableList.appendChild(rich)
    })

    addEventListeners()
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const draggableListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragstartFunc)
    })

    draggableListItems.forEach(item => {
        item.addEventListener('dragover', dragoverFunc)
        item.addEventListener('drop', dropFunc)
        item.addEventListener('dragenter', dragenterFunc)
        item.addEventListener('dragleave', dragleaveFunc)
    })
}

function dragstartFunc() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    
}

function dragoverFunc(e) {
    e.preventDefault()
}

function dropFunc() {
    const dragEndIndex = +this.getAttribute('data-index')

    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
    
}

function dragenterFunc(){
    //this refers to the item (that fired the function), because it's a regular function not arrow function
    this.classList.add('over')
}

function dragleaveFunc() {
    this.classList.remove('over')
}


function swapItems(fromIndex, toIndex){
    const fromItem = listItems[fromIndex].querySelector('.draggable')
    const toItem = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(toItem)
    listItems[toIndex].appendChild(fromItem)
}  