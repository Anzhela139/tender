import { createWebHistory , createRouter } from 'vue-router'

import TenderDetail from './pages/TenderDetail.vue'
import TenderList from './pages/TenderList.vue'

const routes = [
  { path: '/', name: 'tender-list', component: TenderList },
  { path: '/tender/:id', name: 'tender-detail', component: TenderDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router