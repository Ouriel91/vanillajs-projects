const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const back = document.getElementById('back')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const singleMealEl = document.getElementById('single-meal')

let prevMealsEl = ''
let prevSearch = ''

search.focus() //focus on input at starting

submit.addEventListener('submit', searchMeal)

function searchMeal(e) {
    e.preventDefault()

    //cleanup single-meal element
    singleMealEl.innerHTML = ''

    const term = search.value
    loadData(term)

    search.value = ""    
}

const loadData = async(term) => {
    if(term.trim()) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const data = await response.json()

        resultHeading.innerHTML = `
            <h2>Search results for '${term}':</h2>
        `
        prevSearch = resultHeading.innerHTML

        checkIfValidInput(data, term)
    }
    else {
        alert('Please enter a search term');
    }

    search.focus()
}

const checkIfValidInput = (data, term) => {
    if(data.meals === null) {
        errorHandler(term)    
    }
    else {
        showDataInUI(data)
    }
}

const errorHandler = (term) => {
    resultHeading.innerHTML = `<p>No results found for '${term}'</p>`
    mealsEl.innerHTML = ''
    prevSearch = resultHeading.innerHTML
}

const showDataInUI = (data) => {
    mealsEl.innerHTML = data.meals.map(meal => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        `)
    .join('')

    back.style.display = 'none'
    prevMealsEl = mealsEl.innerHTML
}

mealsEl.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => { 
        //return event path recursively 
        //(meal info > meal > meals > container > body > html > document)
        //equivalent to e.composedPath
        
        if(item.classList){
            return item.classList.contains('meal-info')
        }
        else{
            return false
        }
    })

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealID')
        getMealByID(mealID)
    }
})

const getMealByID = async(id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json()
    const meal = data.meals[0]
    
    addMealToDOM(meal)

    //cleanup, the only single meal show
    resultHeading.innerHTML = ''
    mealsEl.innerHTML = ''
}

const addMealToDOM = (meal) => {
    const ingredients = []

    saveIngredients(ingredients, meal)
    showSingleMealUI(ingredients, meal)
}

const saveIngredients = (ingredients, meal) => {
    for(let i = 1; i <= 20; ++i){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        }
        else{
            break;
        }
    }
}

const showSingleMealUI = (ingredients, meal) => {
    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p class="italic">${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${parseText(meal.strInstructions)}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredients
                    .map(ingredient => 
                        `<li onclick='getIngredientInformation(${JSON.stringify(ingredient)})'>
                            ${boldAmounts(ingredient)}
                        </li>`
                        )
                    .join('')
                }
                </ul>
            </div>
        </div>
    `

    back.style.display = 'block'
}

const parseText = (text) => {
    let helpStr = ''
    let index = 1
    text = text.split(/\r|\n/)
    
    text.forEach((s)=> {
        if(s !== ''){
            helpStr += `${index}. ${s} <br /><br />`;
            ++index
        }
    })
    
    return helpStr
}

const boldAmounts = (ingredient) => {
    let help = ingredient.split('-')
    const ret = `<span>${help[0]}</span> - <span class="bold">${help[1]}</span>`

    return ret
}


const getIngredientInformation = (ingredient) => {
    let search = ingredient.split('-')
    window.open(`https://www.google.com/search?tbm=isch&q=${search[0].trim()}`, '_blank');
}

random.addEventListener('click', randomMeal)

function randomMeal() {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    
    getRandomMeal()
}

const getRandomMeal = async() => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data = await response.json()

    const meal = data.meals[0]
    console.log(meal);
    addMealToDOM(meal)
}

back.addEventListener('click', () => {
    mealsEl.innerHTML = prevMealsEl
    resultHeading.innerHTML = prevSearch
    singleMealEl.innerHTML = ''
    back.style.display = 'none'
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchMeal(e)
    }
})


