import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    "path": "/app",
    "component": () => import("../MainApp.vue")
  }],
})

export default router
