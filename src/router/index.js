import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import { authGuard } from "@auth0/auth0-vue";

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
