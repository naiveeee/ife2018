import san from 'san'

export default san.defineComponent({
    template: `<div><super></super></div>`,
    components: {
        super: require('./components/super.san')
    }
})