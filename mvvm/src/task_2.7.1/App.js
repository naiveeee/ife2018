import san from 'san'

export default san.defineComponent({
    template: `
        <div>
            <example></example>
        </div>
    `,
    components: {
        'example': require('./components/example.san')
    }
})