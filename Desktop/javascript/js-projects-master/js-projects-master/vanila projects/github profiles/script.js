const api_url = config.API_URL

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value = ""
    }
})


async function getUser(username){
    
    try{
        const { data } = await axios(api_url + username)
        createUserCard(data)
        getRepos(username)
    }
    catch(error){
        if(404 == error.response.status){
            createErrorCard('No profile with this username')
        }
    }   
}

function createUserCard(user){
    const card = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio ? user.bio : ''}</p>
            <ul>
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.followers}<strong>Followings</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>      
    </div>
    `

    main.innerHTML = card   
}

function createErrorCard(error) {
    const card = `
    <div class="card">
        <h1>${error}</h1>
    </div>
    `

    main.innerHTML = card
}


async function getRepos(username) {
    try {
        const { data } = await axios(api_url + username + '/repos?sort=created')
        console.log(data)
        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
    .slice(0,10)
    .forEach(repo => {
      const link = document.createElement('a')
      link.classList.add('repo')
      link.href = repo.html_url
      link.target = '_blank'
      link.innerText = repo.name


      reposEl.appendChild(link)
    })
}