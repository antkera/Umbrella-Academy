
const openModal = document.querySelector(".modal-open")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".modal-close")

openModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal-show")
})