import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/view/Home.vue'
import Hej from '/src/view/hej.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: "/hej",
        name: "Hej",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "hej" */ "/src/view/hej.vue"),
        
      },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router