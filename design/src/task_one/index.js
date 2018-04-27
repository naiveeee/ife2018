import './style.css'
var btn = document.querySelector('.toggle')
var aim = document.querySelector('.animation-text')
function clickHandler () {
    aim.classList.toggle('active')
}
btn.addEventListener('click', clickHandler)