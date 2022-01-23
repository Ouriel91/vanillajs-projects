const small_cups = document.querySelectorAll(".cup-small")
const liters = document.getElementById("liters")
const perecentage = document.getElementById("perecentage")
const remained = document.getElementById("remained")

bigCupUpdate()

small_cups.forEach((small_cup, index) => {
    small_cup.addEventListener("click", () => {
        highlightCups(index)
    })
})

function highlightCups(index) {

    if(small_cups[index].classList.contains("full") && 
        !small_cups[index].nextElementSibling.classList.contains("full"))
    {
        --index;
    }

    small_cups.forEach((small_cup, c_index) => {
        if (c_index <= index) {
            small_cup.classList.add("full")
        }
        else {
            small_cup.classList.remove("full")
        }
    })

    bigCupUpdate()
}

function bigCupUpdate() {
    const full_cups = document.querySelectorAll('.cup-small.full').length
    const total_cups = small_cups.length

    if(0 === full_cups) {
        perecentage.style.visibility = 'hidden'
        perecentage.style.height = 0
    }else{
        perecentage.style.visibility = 'visible'
        perecentage.style.height = `${full_cups / total_cups *330}px` //330 is cup height
        perecentage.innerText =  `${full_cups / total_cups * 100 }%`
    }

    if(total_cups === full_cups)
    {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    }
    else{
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * full_cups / 1000)}L`
    }
}