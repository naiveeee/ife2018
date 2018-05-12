var tasks = {
    mvvm: ['1.2', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7.1', '2.7.2', '2.8', '3.1', '3.2'],
    design: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    basic: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
} 
function generateScript(mode, college, task) {
    if (mode == 'dev') {
        return `"dev:${college}:task_${task}":"webpack-dev-server --open --env.dev --env.name=task_${task} --env.college=${college}"`
    }
    if (mode == 'prod') {
        return `"build:${college}:task_${task}":"webpack --env.prod --env.name=task_${task} --env.college=${college}"`
    }
}
for (let key in tasks) {
    tasks[key].forEach(function (item) {
        console.log(generateScript('dev', key, item) + ',')
        console.log(generateScript('prod', key, item) + ',')
    })
}