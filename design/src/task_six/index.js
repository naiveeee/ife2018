import './style.less'
require.context("./image", false, /\.webp$/);
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
        //  全部图片加载好之后再展示
        this.loadImageList(this.imageList.map(item => item.dataset.src)).then(res => {
            this.load = false
            res.forEach((imageUrl, index) => {
                if(imageUrl) {
                    this.imageList[index].src = imageUrl
                    this.thumbnailList[index].src = imageUrl
                }
            })
        })
        Object.defineProperty(this, 'loading', {
            get() {
                let display = document.querySelector('.loading').style.display
                return !!(display === '' || display === 'block')
            },
            set(val) {
                if(val) {
                    document.querySelector('.loading').style.display = 'block'
                    document.querySelector('.thumbnail-list').style.display = 'none'
                } else {
                    document.querySelector('.loading').style.display = 'none'
                    document.querySelector('.thumbnail-list').style.display = 'block'
                }
            }
        })
    }
    loadImageAsync(url) {
        return new Promise(function(resolve, reject) {
            let image = new Image()
            image.src = url
            //  利用缓存
            if(image.complete) {
                resolve(url)
            }
            image.onload = function(){
                resolve(url)
            }
            image.onerror = function(){
                reject(new Error('Could not load image '));
            }
        })
    }
    loadImageList(list) {
        return Promise.all(list.map(url => this.loadImageAsync(url)))
    }
    thumbnailSelectHandler(target) {
        console.log('ok')
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
                this.thumbnailSelectHandler(e.target.parentNode.children[0])
            })
        this.imageList.forEach((image, index) => {
            image.style.zIndex = - index
        })
    }
}
let slider = new Slider()
slider.begin()