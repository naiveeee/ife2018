import san from 'san'

export default san.defineComponent({
    template: '<p>Hello {{name}}!</p>',
    initData: function () {
        return {
            name: 'ife2018'
        }
    }
})