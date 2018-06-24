import Todo from './components/Todo.san'
import AddTodo from './components/AddTodo.san'
import EditTodo from './components/EditTodo.san'
import EditTag from './components/EditTag.san'
import {router} from 'san-router'
//  style
import 'node_modules/todomvc-common/base.css'
import 'node_modules/todomvc-app-css/index.css'
import 'san-mui/lib/index.css';
//  svg
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('svg', false, /\.svg$/)
// requireAll(req)
// router cofing
router.add({
    rule: '/',
    Component: Todo,
    target: '#app'
})
router.add({
    rule: '/todos',
    Component: Todo,
    target: '#app'
})
router.add({
    rule: '/addtodo',
    Component: AddTodo,
    target: '#app'
})
router.add({
    rule: '/edittodo',
    Component: EditTodo,
    target: '#app'
})
router.add({
    rule: '/edittag',
    Component: EditTag,
    target: '#app'
})
router.start()