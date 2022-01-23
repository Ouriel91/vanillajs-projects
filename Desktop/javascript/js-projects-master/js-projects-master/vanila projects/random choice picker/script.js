const tagsEl = document.getElementById("tags")
const textarea = document.getElementById("textarea")

textarea.focus() //put cursor when come to page

textarea.addEventListener("keyup", (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelection()
    }
})

function createTags(value) {

    tagsEl.innerHTML = '' //cleanup prevent from creating another tag without comma seperate

    const tags = value.split(",")
        .filter(tag => '' !== tag.trim())
        .map(tag => {
            tag.trim()
            const tagEl = document.createElement('span')
            tagEl.classList.add('tag')
            tagEl.innerText = tag
            tagsEl.appendChild(tagEl)   
        })
}

function randomSelection(){
    
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        },100)
    }, 100)

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()
            highlightTag(randomTag)
        }, 100)
    },3000)
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag')

    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight') 
}