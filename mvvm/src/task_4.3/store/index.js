import { Store } from 'san-store'
import { updateBuilder } from 'san-update'
import service from '../service'
const {todoList, tagList} = service.fetchLocalStorage()
var uuidv1 = require('uuid/v1')
export default new Store({
    initData: {todoList, tagList},
    //  所有的action最后一步都要跟新本地缓存
    actions: {
        beforeAddTodo(todo) {
            //  在头部添加todo
            return updateBuilder().unshift('todoList', todo)
        },
        addTodo({title, tagList, remarks, date}, {dispatch, getState}) {
            dispatch('beforeAddTodo', {
                id: uuidv1(),
                completed: false,
                title,
                date,
                remarks,
                tagList
            })
            service.updateCache({todoList: getState('todoList')})
        },
        beforeEditTodo({title, tagList, remarks, date, id}, {getState}) {
            let index = getState('todoList').findIndex(item => item.id === id)
            return updateBuilder().set(`todoList[${index}]`, {title, tagList, remarks, date, id})
        },
        editTodo({title, tagList, remarks, date, id}, {dispatch, getState}) {
            dispatch('beforeEditTodo', {
                id,
                title,
                date,
                remarks,
                tagList
            })
            service.updateCache({todoList: getState('todoList')})
        },
        beforeSelectTodo(id) {
            return updateBuilder().map('todoList', todo => {
                if(todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        },
        selectTodo(id, {dispatch, getState}) {
            dispatch('beforeSelectTodo', id)
            service.updateCache({todoList: getState('todoList')})
        },
        beforeRemoveTodo(ids) {
            var idSet = new Set(ids)
            return updateBuilder().filter('todoList', item => !idSet.has(item.id))
        },
        removeTodo(ids, {dispatch, getState}) {
            dispatch('beforeRemoveTodo', ids)
            service.updateCache({todoList: getState('todoList')})
        },
        beforeCheckAll(ids) {
            let s = new Set(ids)
            return updateBuilder().map('todoList', todo => {
                if(s.has(todo.id)) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        },
        checkAll(ids, {dispatch, getState}) {
            dispatch('beforeCheckAll', ids)
            service.updateCache({todoList: getState('todoList')})
        },
        beforeEditTag(tagList) {
            tagList.map(tag => {
                if(!tag.id) {
                    tag.id = uuidv1()
                }
                return tag
            })
            return updateBuilder().set('tagList', tagList)
        },
        //  改动tag标签时，去修改已有todo的标签
        applyChangeInTodoList(_, {getState}) {
            let todoList = getState('todoList'),
                tagList = getState('tagList'),
                tagListMap = {}
            tagList.forEach(tag => tagListMap[tag.id] = tag)
            return updateBuilder().map('todoList', todo => Object.assign(todo, {tagList: service.merageTags(todo.tagList, tagListMap)}))
        },
        editTag(tagList, {dispatch, getState}) {
            dispatch('beforeEditTag', tagList)
            dispatch('applyChangeInTodoList')
            service.updateCache({todoList: getState('todoList'), tagList: getState('tagList')})
        }
    }
})