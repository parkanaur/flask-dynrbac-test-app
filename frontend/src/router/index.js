import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: () => import('../views/Users/UserList.vue')},

  {path: '/users', component: () => import('../views/Users/UserList.vue')},
  {path: '/users/:user_id', component: () => import('../views/Users/UserEdit.vue')},
  {path: '/users/new', component: () => import('../views/Users/UserCreate.vue')},

  {path: '/roles', component: () => import('../views/Roles/RoleList.vue')},
  {path: '/roles/:role_id', component: () => import('../views/Roles/RoleEdit.vue')},
  {path: '/roles/new', component: () => import('../views/Roles/RoleCreate.vue')},

  {path: '/permissions', component: () => import('../views/Permissions/PermissionList.vue')},
  {path: '/permissions/:permission_id', component: () => import('../views/Permissions/PermissionEdit.vue')},
  {path: '/permissions/new', component: () => import('../views/Permissions/PermissionCreate.vue')},

  {path: '/units', component: () => import('../views/Units/UnitList.vue')},
  {path: '/units/:user_id', component: () => import('../views/Units/UnitEdit.vue')},
  {path: '/units/new', component: () => import('../views/Units/UnitCreate.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
