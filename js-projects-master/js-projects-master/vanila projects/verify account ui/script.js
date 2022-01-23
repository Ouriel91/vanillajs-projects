const codes = document.querySelectorAll('.code')

codes[0].focus() // focus on the first

codes.forEach((code, index) => {
    code.addEventListener('keydown', (event) => {
        if(event.key >= 0 && event.key <= 9){
            codes[index].value = ''
            if(index + 1 < codes.length){
                setTimeout(() => codes[index + 1].focus(), 10)
            }
            
        }else if(event.key === 'Backspace') {
            if(index > 0){
                setTimeout(() => codes[index - 1].focus(), 10)
            }
        }
    })
})