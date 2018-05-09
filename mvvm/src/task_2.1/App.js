import san from 'san'

export default san.defineComponent({
    template: `
        <div>
            <div class="item-list">
                <span class="item">
                    姓名：<input type="text" value="{= name =}"/>
                </span>
                <span class="item">
                    年龄：<input type="number" value="{= age =}"/>
                </span>
                <span class="item">
                    简介：<textarea rows="3" cols="30" type="text" value="{= description =}"></textarea>
                </span>
            </div>
            <p>
                信息：<button on-click="reset">移出信息</button>
            </p>
            <ul>
                <li>
                    姓名：<span class="text">{{name}}</span>
                </li>
                <li>
                    年龄：<span class="text">{{age}}</span>
                </li>
                <li>
                    简介：<span class="text">{{description}}</span>
                </li>
            </ul>
        </div>
    `,
    initData: function () {
        return {
            name: 'ife',
            age: '4',
            description: '由百度创办的免费前端技术学习实践、交流、分享平台'
        }
    },
    reset: function () {
        let arr = this.data.raw
        for(let key in arr){
            this.data.set(key, '')
        }
    }
})