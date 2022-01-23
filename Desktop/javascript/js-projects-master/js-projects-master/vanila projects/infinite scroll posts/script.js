const post_container = document.getElementById('post-container')
const filter = document.getElementById('filter')
const loader = document.getElementById('loader')

let page = 1
const api_url = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`

async function getData() {
    const response = await fetch(api_url)
    const data = await response.json()

    return data
}


async function showPosts(){
    const posts = await getData()

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
                ${post.body}
            </p>
        </div>
        `

        post_container.appendChild(postEl)
    })
}

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        loader.classList.add('show')

        setTimeout(() => {
            loader.classList.remove('show')

            setTimeout(() => {
                ++page
                showPosts()
            },300)
        }, 1000)
    }
})

function filterPosts(e) {
    const value = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()

        if(title.indexOf(value) > -1 || body.indexOf(value) > -1) {
            post.style.display = 'flex'
        }
        else {
            post.style.display = 'none'
        }
    })
}

filter.addEventListener('input', filterPosts)

showPosts()


