const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkboxes)

function checkboxes() {

    const triggerBottom = window.innerHeight / 5 * 4; //80% height

    boxes.forEach(box => {
        if (box.getBoundingClientRect().top < triggerBottom) {
            box.classList.add("show")
        }
        else{
            box.classList.remove("show")
        }
    })
}