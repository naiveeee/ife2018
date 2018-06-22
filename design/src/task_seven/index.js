import 'node_modules/animate.css/animate.min.css'
let inputArray = Array.prototype.map.call(document.querySelectorAll('form input'), item => item)
let submitButton = document.querySelector('button[type=submit]')
let form = document.querySelector('form')
if(inputArray.every(item => !!item.value)) {
    submitButton.classList.add('pulse')
}
form.addEventListener('input', function (e) {
    if(e.target.value) {
        e.target.nextElementSibling.classList.add('active')
    } else {
        e.target.nextElementSibling.classList.remove('active')
    }
})
//  blur事件不会冒泡
function blurHandler(e) {
    if(inputArray.every(item => !!item.value)) {
        submitButton.classList.add('pulse')
    } else {
        submitButton.classList.remove('pulse')
    }
}
inputArray.forEach(item => item.addEventListener('blur', blurHandler))
submitButton.addEventListener('click', function(e) {
    event.preventDefault()
})
