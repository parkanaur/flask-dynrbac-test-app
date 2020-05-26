import Vue from 'vue'
import Vuex from 'vuex'
import {api} from './rbac_api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading_cnt: 0,
        permissions: [],
        roles: [],
        users: [],
        units: []
    },
    getters: {
        loading_cnt: state => state.loading_cnt,
        permissions: state => state.permissions,
        roles: state => state.roles,
        users: state => state.users,
        units: state => state.units,
    },
    mutations: {
        inc_loading: (state) => state.loading_cnt += 1,
        dec_loading: (state) => state.loading_cnt -= 1,
        set_permissions: (state, data) => state.permissions = data,
        set_roles: (state, data) => state.roles = data,
        set_users: (state, data) => state.users = data,
        set_units: (state, data) => state.units = data,

        update_user(state, user) {
            let ind = state.users.findIndex(u => u.id === user.id);
            if (ind === -1)
                state.users.push(user);
            else
                Vue.set(state.users, ind, user);
        },
        update_role(state, role) {
            let ind = state.roles.findIndex(r => r.id === role.id);
            if (ind === -1)
                state.roles.push(role);
            else
                Vue.set(state.roles, ind, role);
        },
        update_permission(state, permission) {
            let ind = state.permissions.findIndex(p => p.id === permission.id);
            if (ind === -1)
                state.permissions.push(permission);
            else
                Vue.set(state.permissions, ind, permission);
        },
        update_unit(state, unit) {
            let ind = state.units.findIndex(u => u.id === unit.id);
            if (ind === -1)
                state.units.push(unit);
            else
                Vue.set(state.units, ind, unit);
        },

        delete_user(state, id) {
            let ind = state.users.findIndex(u => u.id === id);
            state.users.splice(ind, 1);
        },
        delete_role(state, id) {
            let ind = state.roles.findIndex(r => r.id === id);
            state.roles.splice(ind, 1);
        },
        delete_permission(state, id) {
            let ind = state.permissions.findIndex(r => r.id === id);
            state.permissions.splice(ind, 1);
        },
        delete_unit(state, id) {
            let ind = state.units.findIndex(r => r.id === id);
            state.units.splice(ind, 1);
        }
    },
    actions: {
        reload_permissions(context) {
            context.commit('inc_loading');
            api.get_permissions().then(data => {
                context.commit('set_permissions', data.data);
                context.commit('dec_loading');
            });
        },
        reload_roles(context) {
            context.commit('inc_loading');
            api.get_roles().then(data => {
                context.commit('set_roles', data.data);
                context.commit('dec_loading');
            });
        },
        reload_users(context) {
            context.commit('inc_loading');
            api.get_users().then(data => {
                context.commit('set_users', data.data);
                context.commit('dec_loading');
            });
        },
        reload_units(context) {
            context.commit('inc_loading');
            api.get_units().then(data => {
                context.commit('set_units', data.data);
                context.commit('dec_loading');
            });
        },

        update_user(context, user) {
            api.update_user(user).then(response => {
                context.commit('update_user', user);
            })
        },
        update_role(context, role) {
            api.update_role(role).then(response => {
                context.commit('update_role', role);
            })
        },
        update_permission(context, permission) {
            api.update_permission(permission).then(response => {
                context.commit('update_permission', permission);
            })
        },
        update_unit(context, unit) {
            api.update_unit(unit).then(response => {
                context.commit('update_unit', unit);
            })
        },

        delete_user(context, id) {
            api.delete_user(id).then(response => {
                context.commit('delete_user', id);
            });
        },
        delete_role(context, id) {
            api.delete_role(id).then(response => {
                context.commit('delete_role', id);
            });
        },
        delete_permission(context, id) {
            api.delete_permission(id).then(response => {
                context.commit('delete_permission', id);
            });
        },
        delete_unit(context, id) {
            api.delete_unit(id).then(response => {
                context.commit('delete_unit', id);
            });
        }
    }
})
