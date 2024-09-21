const modalText = document.getElementById("modal-text");
const modal = document.getElementById("modal");
const showModal = (message) => {
  modalText.innerText = message;
  modal.style.display = "flex";
};
const removeModal=()=>{
    modal.style.display="none"
}
export { showModal , removeModal};
