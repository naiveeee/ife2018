const todoListKey = 'sanjs-todoapp-todoList'
const todoTagKey = 'sanjs-todoapp-todoTag'
const todoStorage = {
  fetch() {
    var todoList = JSON.parse(localStorage.getItem(todoListKey) || '[]')
    var tagList = JSON.parse(localStorage.getItem(todoTagKey) || '[]')
    return {todoList, tagList}
  },
  save({todoList, tagList}) {
    if(todoList) {
        localStorage.setItem(todoListKey, JSON.stringify(todoList))
    }
    if(tagList) {
        localStorage.setItem(todoTagKey, JSON.stringify(tagList))
    }
  }
}
//  把随机数据写入缓存
if(!todoStorage.fetch().todoList.length) {
    var demoData = require('./generateDemoData').default
    todoStorage.save({
        todoList: demoData.todoList,
        tagList: demoData.tagList
    })
}
export default {
    fetchLocalStorage() {
        return todoStorage.fetch()
    },
    updateCache({todoList, tagList}) {
        todoStorage.save({todoList, tagList})
    },
    merageTags(aim, tagListMap) {
        let res = []
        aim.forEach(tag => {
            if(tagListMap[tag.id]) {
                res.push(tagListMap[tag.id])
            }
        })
        return res
    }
}