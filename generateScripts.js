var college = ['mvvm', 'basic', 'design'],
    taskArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
function generateScript(mode, college, task) {
    if (mode == 'dev') {
        return `"dev:${college}:task_${task}":"webpack-dev-server --open --env.dev --env.name=task_${task} --env.college=${college}"`
    }
    if (mode == 'prod') {
        return `"build:${college}:task_${task}":"webpack --env.prod --env.name=task_${task} --env.college=${college}"`
    }
}
for (let i = 0; i < college.length; i++) {
    for (let j = 0; j < taskArr.length; j++) {
        console.log(generateScript('dev', college[i], taskArr[j]) + ',')
        console.log(generateScript('prod', college[i], taskArr[j]) + ',')
    }
}