import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import {authGuard} from "@auth0/auth0-vue";
import Create from "@/views/Create";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: authGuard,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
