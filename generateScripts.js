var tasks = {
    mvvm: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    design: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
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