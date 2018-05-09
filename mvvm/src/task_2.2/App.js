import san from 'san'
const UNDETERMINED = '待定'
const ACCEPT = '合格'
const REJECT = '不合格'

export default san.defineComponent({
    template: `
        <div class='table-container'>
            <button id="btn-add" on-click="addItem">添加</button>
            <input value="{= input =}"/>
            <table class='table-info' border='1'>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr s-for="item, index in items">
                        <td>{{item.name}}</td>
                        <td>{{item.status}}</td>
                        <td>
                            <button s-if="item.status === status.UNDETERMINED" on-click="verify(index)">审核</button>
                            <button s-else on-click="deleteItem(index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    initData: function () {
        return {
            input: '',
            status: {
                UNDETERMINED,
                ACCEPT,
                REJECT
            },
            items: [
                {
                    name: 'aaa',
                    status: UNDETERMINED
                },
                {
                    name: 'bbb',
                    status: ACCEPT
                },
                {
                    name: 'ccc',
                    status: REJECT
                }
            ]
        }
    },
    verify: function (index) {
        this.data.set(`items[${index}].status`, ACCEPT)
    },
    deleteItem: function (index) {  
        this.data.splice('items', [index, 1])
    },
    addItem: function () {
        this.data.push('items', {
            name: this.data.get('input'),
            status: UNDETERMINED
        })
    }
})