const config = {
    demoListsLength: 15,
    demoTagsLength: 5
}
//  生成给定范围的随机数
function generateRandom(from, to, accu) {
    return (from + Math.random()*Math.abs(to - from)).toFixed(accu)
}
//  在指定数组中随机取出N个不重复的数据
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}
var uuidv1 = require('uuid/v1')
var tagList = Array.apply(null, {length: config.demoTagsLength}).map(item => ({
    id: uuidv1(),
    description: generateRandom(0, 100, 0),
    color: `rgba(${generateRandom(0, 255, 0)},${generateRandom(0, 255, 0)},${generateRandom(0, 255, 0)},${generateRandom(0.4, 1, 2)})`
}))
var todoList = Array.apply(null, {length: config.demoListsLength}).map(item => ({
    id: uuidv1(),
    title: generateRandom(0, 100, 0),
    completed: Math.random() > 0.5 ? true : false,
    remarks: '',
    date: (new Date(2018, generateRandom(1, 12), generateRandom(1, 31))).toLocaleDateString().replace(/\//g, '-'),
    tagList: getArrayItems(tagList, generateRandom(0, 2, 0)).sort()
}))
todoList.unshift({
    id: uuidv1(),
    title: '修改和编辑标签',
    completed: true,
    remarks: '',
    date: (new Date(2077, 0, 1)).toLocaleDateString().replace(/\//g, '-'),
    tagList: []
})
todoList.unshift({
    id: uuidv1(),
    title: '用indexDB实现本地化存储',
    completed: false,
    remarks: '',
    date: '??????',
    tagList: []
})
export default {
    tagList,
    todoList
}