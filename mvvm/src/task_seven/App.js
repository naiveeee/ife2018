import san from 'san'

export default san.defineComponent({
template: `<div><taskmenu data="{{data}}">
                <div class="task-item">
                    <h3 style="color: purple">{{name}}</h3>
                    <p>{{title}}</p>
                    <p>{{content}}</p>
                    <p>{{time}}</p>
                </div>
            </taskmenu></div>`,
    components: {
        'taskmenu': require('./components/taskmenu.san')
    },
    initData: function () {
        return {
            data: {
                title: 'scope',
                subItem: [
                    {
                        name: '任务一',
                        title: '1',
                        content: '有点丑啊',
                        time: '2888.12.12'
                    },
                    {
                        name: '任务二',
                        title: '2',
                        content: '不过没关系',
                        time: '2888.12.12'
                    },
                    {
                        name: '任务三',
                        title: '3',
                        content: '凑合就行',
                        time: '2888.12.12'
                    },
                    {
                        name: '任务四',
                        title: '4',
                        content: '关键是要掌握',
                        time: '2888.12.12'
                    },
                    {
                        name: '任务五',
                        title: '5',
                        content: 'scoped slot的',
                        time: '2888.12.12'
                    },
                    {
                        name: '任务六',
                        title: '6',
                        content: '使用方法',
                        time: '2888.12.12'
                    }
                ]
            }
        }
    }
})