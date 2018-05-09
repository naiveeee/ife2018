import san from 'san'

export default san.defineComponent({
    template: `
        <div class='block' style="background-color: {{bgColor}}" on-click="toggleColor"></div>
    `,
    initData: function () {
        return {
            bgColor: 'blue'
        }
    },
    toggleColor: function () {
        switch(this.data.get('bgColor')){
            case 'red':
                this.data.set('bgColor', 'blue')
                break;
            case 'blue':
                this.data.set('bgColor', 'red')
                break;
        }
    }
})