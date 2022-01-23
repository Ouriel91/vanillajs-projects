const panels = document.querySelectorAll(".panel")

panels.forEach(panel => {
    panel.addEventListener("click", () => {
        removeActiveFromPanels()
        panel.classList.add("active");
    })
})

function removeActiveFromPanels() {
    panels.forEach(panel => {
        panel.classList.remove("active")
    })
}