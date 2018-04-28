import './style.css'
import { ALPN_ENABLED } from 'constants';

var btnGroup = document.querySelector('.button-group'),
    box = document.querySelector('#box')

function transformToggle (pre, text) {
    var reg = new RegExp('(.+)\(.*\)$'),
        key = reg.exec(text)[1]
    if(!key) return pre
    if(pre.indexOf(key) == -1 ) return pre.concat(` ${text}`)
    return pre.replace(key, '')
}

function clickHandler () {
    switch(event.target.textContent){
        case '平移':
            box.style.transform = transformToggle(box.style.transform, 'translate(10px, 20px)')
            break
        case '旋转':
            box.style.transform = transformToggle(box.style.transform, 'rotate(45deg)')
            break
        case '压缩':
            box.style.transform = transformToggle(box.style.transform, 'scaleX(0.5)')
            break
        case '倾斜':
            box.style.transform = transformToggle(box.style.transform, 'skew(30deg)')
            break
        case 'all':
            let all = 'translate(10px, 20px) rotate(45deg) scaleX(0.5) skew(30deg)'
            box.style.transform = box.style.transform == all ? '' : all
            break
        default:
    }
    console.log(box.style.transform)
}

btnGroup.addEventListener('click', clickHandler)