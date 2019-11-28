import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'employeeList' }
  },
  {
    path: '/employees',
    name: 'employeeList',
    component: () => import('@/views/employees/EmployeeList.vue')
  },
  {
    path: '/employee/edit',
    name: 'employeeEdit',
    component: () => import('@/views/employees/EmployeeEdit.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  next();
})

export default router
