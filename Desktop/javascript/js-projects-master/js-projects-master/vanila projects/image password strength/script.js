const background = document.getElementById('background')
const password = document.getElementById('password')

password.addEventListener('input', (e) => {
    const input = e.target.value
    const length = input.length

    const blur = 20 - 2*length
    background.style.filter = `blur(${length}px)`
})

