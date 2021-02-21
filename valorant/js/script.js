//button submit turns red when text and passwd is entered
function check() {
    form = document.getElementById("login")
    let login = form.children[0].value
    let password = form.children[1].value
    let button = form.children[4].children[0]

    if (login.length > 0 && password.length > 0) {
        button.classList.add("btn-active")
        button.disabled = false
    } else {
        button.classList.remove("btn-active")
        button.disabled = true
    }
}
//to bootstrap popover work
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})