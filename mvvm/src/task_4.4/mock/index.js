export default class Mock {
    constructor() {
        this.count = 0
    }
    mockAsyncRequest(length = 2) {
        let arr = Array.apply(null, {length}).map(item => ({
            title: `${++(this.count)}`,
            imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=188920380,1736310545&fm=173&app=25&f=JPEG?w=218&h=146&s=1BA046841C57FFC61E9E8A290300305B',
            reportTime: new Date().toDateString(),
            medium: '新浪'
        }))
        return new Promise(resolve => setTimeout(resolve.bind(null, arr), 200))
    }
    mockInitialData() {
        let initialData = []
        while(this.count <= 10) {
            initialData.push({
                title: `${++(this.count)}`,
                imgUrl : 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=188920380,1736310545&fm=173&app=25&f=JPEG?w=218&h=146&s=1BA046841C57FFC61E9E8A290300305B',
                reportTime : new Date().toDateString(),
                medium : '新浪'
            })
        }
        return initialData
    }
}