import './style.less'
class Slider {
    constructor() {
        this.thumbnailList = Array.prototype.map.call(document.querySelectorAll('.thumbnail'), item => item)
        this.imageList = Array.prototype.map.call(document.querySelectorAll('.image'), item => item)
        if(!this.thumbnailList.length || !this.imageList.length) {
            throw new Error('找不到图片或缩略图')
        }
        this.active = {
            thumbnail: this.thumbnailList[0],
            image: this.imageList[0]
        }
    }
    thumbnailSelectHandler(target) {
        if(target === this.active.thumbnail) {
            return
        }
        let thumbnailNode = target,
            index = this.thumbnailList.findIndex(item => item === target),
            imageNode = this.imageList[index]
        thumbnailNode.classList.add('active')
        this.active.thumbnail.classList.remove('active')
        //  设置z-index确保之前展示的总在最上层
        this.imageList.forEach(image => {
            if(image === imageNode) {
                image.style.zIndex = 10
                image.classList.add('active')
            } else if(image === this.active.image) {
                image.style.zIndex = 9
                image.classList.remove('active')
            } else {
                image.style.zIndex = 1
            }
        })
        this.active.thumbnail = thumbnailNode
        this.active.image = imageNode
        
    }
    begin() {
        let thumbnailList = document.querySelector('.thumbnail-list')
            thumbnailList.addEventListener('click', e => {
                if (!e.target.classList.contains('thumbnail')) {
                    return
                }
                this.thumbnailSelectHandler(e.target)
            })
        this.imageList.forEach((image, index) => {
            image.style.zIndex = - index
        })
    }
}
let slider = new Slider()
slider.begin()