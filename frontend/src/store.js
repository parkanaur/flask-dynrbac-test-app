import Vue from 'vue'
import Vuex from 'vuex'
import {api} from './api_mock';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading_cnt: 0,
        permissions: [],
        roles: [],
        users: []
    },
    getters: {
        loading_cnt: state => state.loading_cnt,
        permissions: state => state.permissions,
        roles: state => state.roles,
        users: state => state.users,
    },
    mutations: {
        inc_loading: (state) => state.loading_cnt += 1,
        dec_loading: (state) => state.loading_cnt -= 1,
        set_permissions: (state, data) => state.permissions = data,
        set_roles: (state, data) => state.roles = data,
        set_users: (state, data) => state.users = data,

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

        delete_user(state, id) {
            let ind = state.users.findIndex(u => u.id === id);
            state.users.splice(ind, 1);
        },
        delete_role(state, id) {
            let ind = state.roles.findIndex(r => r.id === id);
            state.roles.splice(ind, 1);
        }
    },
    actions: {
        reload_permissions(context) {
            context.commit('inc_loading');
            api.get_permissions().then(data => {
                context.commit('set_permissions', data);
                context.commit('dec_loading');
            });
        },
        reload_roles(context) {
            context.commit('inc_loading');
            api.get_roles().then(data => {
                context.commit('set_roles', data);
                context.commit('dec_loading');
            });
        },
        reload_users(context) {
            context.commit('inc_loading');
            api.get_users().then(data => {
                context.commit('set_users', data);
                context.commit('dec_loading');
            });
        },

        update_user(context, user) {
            context.commit('update_user', api.update_user(user));
        },
        update_role(context, role) {
            context.commit('update_role', api.update_role(role));
        },

        delete_user(context, id) {
            api.delete_user(id);
            context.commit('delete_user', id);
        },
        delete_role(context, id) {
            api.delete_role(id);
            context.commit('delete_role', id);
        }
    }
})
