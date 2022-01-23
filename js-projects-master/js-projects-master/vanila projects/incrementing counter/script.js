const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerHTML = '0'

    const updateCounter = () => {
        //const data_target = Number(counter.getAttribute('data-target'))
        //+ convert it to number
        
        const data_target = +counter.getAttribute('data-target') 
        const c = +counter.innerText

        if(c < data_target)
        {
            counter.innerText = `${c + 1}`
            setTimeout(updateCounter, 1)
        }
        else{
            counter.innerText = data_target
        }
    }

    updateCounter()
})