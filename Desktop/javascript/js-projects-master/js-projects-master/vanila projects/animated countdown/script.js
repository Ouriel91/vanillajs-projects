const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const final = document.querySelector('.final')
const replayBtn = document.getElementById('replay')

runAnimation()

function runAnimation(){
    nums.forEach((num, index) => {
        num.addEventListener('animationend', (e) => {
            if(e.animationName === 'go_in' && index < nums.length - 1){
                num.classList.remove('in')
                num.classList.add('out')
            }
            else if(e.animationName === 'go_out' && num.nextElementSibling){
                num.nextElementSibling.classList.add('in')
            }
            else{
                counter.classList.add('hide')
                final.classList.add('show')
            }
        })
    })
}

function resetAll(){
    counter.classList.remove('hide')
    final.classList.remove('show')

    nums.forEach(num => {
        num.classList.value = ""
    })

    nums[0].classList.add("in")
}

replayBtn.addEventListener('click', () => {
    
    resetAll()
    runAnimation()
})

