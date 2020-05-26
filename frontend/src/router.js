import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import Roles from './views/Roles.vue'
import Permissions from "./views/Permissions.vue"
import Units from "./views/Units.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', component: Home },
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/permissions', component: Permissions },
        { path: '/units', component: Units }
    ]
})
