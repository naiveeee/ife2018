import san from 'san'

const emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

export default san.defineComponent({
    template: `
        <div>
            <div class="container">
                <div style="margin-top: 2em">
                    <san-input placeholder="默认"></san-input>
                </div>
                <div style="margin-top: 2em">
                    <san-input placeholder="手机" promptText="请输入一个手机号码" on-input="inputHandler($event)" value="{= value_1 =}" verify="{{verifyPhone}}"></san-input>
                </div>
                <div style="margin-top: 2em">
                    <san-input placeholder="邮箱" promptText="请输入一个邮箱" on-input="inputHandler($event)" value="{= value_2 =}" verify="{{verifyEmail}}"></san-input>
                </div>
                <div style="margin-top: 2em">
                    <san-input placeholder="禁用" disabled></san-input>
                </div>
            </div>
            <div class="container">
                <div style="margin-top: 2em">
                    默认（未绑定数据）：<san-checkbox on-change="changeHandler($event, 1)">hello</san-checkbox>
                </div>
                <div style="margin-top: 2em">
                    未设置 checked:（{{checked_5}}）：<san-checkbox checked="{= checked_5 =}" on-change="changeHandler($event, 5)">hello</san-checkbox>
                </div>
                <div style="margin-top: 2em">
                    已设置 checked:（{{checked_2}}）<san-checkbox checked="{= checked_2 =}" trueValue="ok" falseValue='no' on-change="changeHandler($event, 2)">hello</san-checkbox>
                </div>
                <div style="margin-top: 2em">
                    禁用(未选)：<san-checkbox disabled on-change="changeHandler($event, 2)">hello</san-checkbox>
                </div>
                <div style="margin-top: 2em">
                    禁用(已选)：<san-checkbox disabled checked="{{true}}" on-change="changeHandler($event, 2)">hello</san-checkbox>
                </div>
                <div style="margin-top: 2em">
                indeterminate：<san-checkbox indeterminate checked="{= checked_4 =}" trueValue="ok" falseValue='no' on-change="changeHandler($event, 4)">hello</san-checkbox>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        `,
    components: {
        'san-input': require('./components/SanInput.san'),
        'san-checkbox': require('./components/SanCheckbox.san'),
        'san-checkbox-tree': require('./components/SanCheckboxTree.san')
    },
    initData: function () {
        return {
            value_1: '',
            value_2: '',
            checked_1: '',
            checked_2: 'ok',
            checked_3: 'no',
            checked_4: 'ok',
            checked_5: true,
            verifyEmail: function (value, options) {
                if(!value){
                    options.setErrorText('输入值不能为空')
                    return false 
                }
                if(!emailReg.test(value)) {
                    options.setErrorText('请输入正确的邮箱格式')
                    return false 
                }
                return true
            },
            verifyPhone: function (value, options) {
                if(!value){
                    options.setErrorText('输入值不能为空')
                    return false 
                }
                if(!phoneReg.test(value)) {
                    options.setErrorText('请输入正确的手机号码')
                    return false 
                }
                return true
            },
            treeData: [
                {
                    name: 'hello',
                    checked: false,
                    disabled: false,
                    indeterminate: false,
                    children: [
                        {
                            checked: true,
                            disabled: true,
                            indeterminate: false,
                            children: null
                        }
                    ]
                },
            ]
        }
    },
    inputHandler: function (event) {
        //这里可以看出双向绑定成功了，不过由于 原生input -> 组件san-input -> 组件App 
        //中间触发(fire)了两次事件 第二次事件处理是在下一个event loop里的 
        //所以用this.nextTick()才能观察到 
        this.nextTick(() => console.log(this.data.get('value_1')))
    },
    changeHandler: function (event, id) {
        this.nextTick(() => console.log(this.data.get(`checked_${id}`)))
    }
})