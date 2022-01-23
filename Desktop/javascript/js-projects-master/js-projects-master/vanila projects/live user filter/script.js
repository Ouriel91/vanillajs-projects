const api_url = config.API_URL

const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []


getData()

filter.addEventListener('input', (e) => {
    filterUsers(e.target.value)
})

async function getData() {
    const response = await fetch(api_url)
    const data  = await response.json()

    const results = data.results
    
    //clear object
    result.innerHTML = ''
    
    results.forEach(user => {
        const li = document.createElement('li')

        listItems.push(li)

        li.innerHTML = `
        <li>
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4><span style="font-weight:bold">${user.name.title}</span> ${user.name.first 
                    + ' ' + user.name.last}</h4>
                <p>${user.location.city + ', ' + user.location.country}</p>
            </div>
        </li>
        `

        result.appendChild(li)
    })
    
}

function filterUsers(data) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(data.toLowerCase())){
            item.classList.remove('hide')
        }
        else{
            item.classList.add('hide')
        }
    })   
}