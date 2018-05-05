import san from 'san'

export default san.defineComponent({
    template: `
            <ul>
                <li s-for="item in items">
                    <item data="{{item}}"></item>
                </li>
            </ul>`,
    components: {
        'item': require('./components/item.san')
    },
    initData: function () {
        return {
            items: [
                {
                    title: '这是一个item',
                    details: '这是详细信息'
                },
                {
                    title: '这是一个item',
                    details: '这是详细信息'
                },
                {
                    title: '这是一个item',
                    details: '这是详细信息'
                },
                {
                    title: '这是一个item',
                    details: '这是详细信息'
                }
            ]
        }
    }
})