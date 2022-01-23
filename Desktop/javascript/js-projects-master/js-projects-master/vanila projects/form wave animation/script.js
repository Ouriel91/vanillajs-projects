const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
    label.innerHTML = label.innerText 
        .split('') //split each letter 
        .map((letter, index) => `<span style="transition-delay:${index *50}ms">${letter}</span>`)
        .join(''); //return to string
})