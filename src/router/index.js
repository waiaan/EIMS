import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeList from '../views/EmployeeList.vue'
import EmployeeEdit from '../views/EmployeeEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'employeeList',
    component: EmployeeList
  },
  {
    path: '/edit',
    name: 'employeeEdit',
    component: EmployeeEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
