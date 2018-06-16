import Todo from './components/Todo.san'
import {router} from 'san-router'
//  style
import '../../../node_modules/todomvc-common/base.css'
import '../../../node_modules/todomvc-app-css/index.css'
// router cofing
router.add({
    rule: '/',
    Component: Todo,
    target: '#app'
})
router.add({
    rule: '/all',
    Component: Todo,
    target: '#app'
})
router.add({
    rule: '/active',
    Component: Todo,
    target: '#app'
})
router.add({
    rule: '/completed',
    Component: Todo,
    target: '#app'
})
router.start()