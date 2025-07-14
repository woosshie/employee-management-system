import { useAuthStore } from 'stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue'),  meta: { requiresAuth: true }},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Branches', component: () => import('pages/Branches.vue')},
      {path: '/Departments', component: () => import('pages/Departments.vue')},
      {path: '/Desks', component: () => import('pages/Desks.vue')},
      {path: '/Purchase', component: () => import('pages/Purchase.vue')},
      {path: '/Setting', component: () => import('pages/Setting.vue')},
      {path: '/BrokenReport', component: () => import('pages/BrokenDevice.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Emptable', component: () => import('pages/EMPTable.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Reports', component: () => import('pages/Reports.vue')},

      {path: '/DocLaptopRestock', component: () => import('pages/DocLaptopRestock.vue')},
      
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Directory', component: () => import('pages/Directory.vue')},
      {path: '/Footer', component: () => import('pages/Footer.vue')},
      {path: '/CardHeader', component: () => import('src/pages/Branches.vue')},

      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },
  { path: '/Login',component: () => import('pages/Login.vue')},
  { path: '/:catchAll(.*)*',component: () => import('pages/Error404.vue')},
  { path: '/Mail',component: () => import('layouts/Mail.vue')},
  { path: '/Maintenance', component: () => import('pages/Maintenance.vue')},
  { path: '/Pricing', component: () => import('pages/Pricing.vue')},
  { path: '/Login-1', component: () => import('pages/Login-1.vue')},
  { path: '/Lock', component: () => import('pages/LockScreen.vue')},
  { path: '/Lock-2',component: () => import('pages/LockScreen-2.vue')}
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 라우터 가드 설정
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/Login')
  } else {
    next()
  }
})


export default routes