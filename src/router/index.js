import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'employeesList' },
    meta: {
      title: 'home'
    }
  },
  {
    path: '/employees',
    name: 'employeesList',
    component: () => import('@/views/employees'),
    meta: {
      title: 'employees'
    }
  },
  {
    path: '/employee/edit',
    name: 'employeeEdit',
    component: () => import('@/views/employees/edit.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('@/views/jobs')
  },
  {
    path: '/deps',
    name: 'departments',
    component: () => import('@/views/departments')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name.indexOf('Edit') > -1) {
    const paramsLength = Object.keys(to.params).length;
    let prefix = '';
    if (paramsLength > 0) {
      prefix = 'edit ';
    } else {
      prefix = 'add ';
    }
    to.meta && (to.meta.title = prefix + to.name.replace('Edit', ''));
  }
  next();
})

export default router
