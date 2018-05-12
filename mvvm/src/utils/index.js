export function propsValidator (props, component) {
    props.map(function(item) {
        if(component.data.get(item.name) !== undefined) {
            if(item.DataType && component.data.get(item.name).constructor !== item.DataType){
                throw new Error(`${item.name}的类型应为${Object.prototype.toString.apply(item.default)}`)
            }
            if(item.validator && item.validator instanceof Function && !item.validator()) {
                throw new Error(`${item.name}校验失败`)
            }
        }
        else{
            let res = item.default ? item.default instanceof Function ? item.default() : item.default :null
            component.data.set(item.name, res)
        }
    })
}