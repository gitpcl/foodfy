const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const closeModal = document.querySelector('.close-modal')

for (let card of cards) {
    card.addEventListener("click", function() {
        const videoId = card.getAttribute('id')
        const modalTitle = card.querySelector('h2').innerHTML
        const modalChef = card.querySelector('p').innerHTML

        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `./assets/${videoId}.png`
        modalOverlay.querySelector('h2').innerHTML = modalTitle
        modalOverlay.querySelector('p').innerHTML = modalChef
        
    })
}


closeModal.addEventListener('click', function() {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('img').src = ""
    modalOverlay.querySelector('h2').innerHTML = ""
    modalOverlay.querySelector('p').innerHTML = ""
})
