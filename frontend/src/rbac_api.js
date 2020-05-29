const axios = require('axios').default;

const LOADING_TIMEOUT = 1000;

function deep_copy(data) {
    return JSON.parse(JSON.stringify(data));
}

const api = {
    get_permissions() {
        return axios.get(`/api/rbac/permissions`)
    },
    get_roles() {
        return axios.get(`/api/rbac/roles`)
    },
    get_users() {
        return axios.get(`/api/rbac/users`)
    },
    get_units() {
        return axios.get(`/api/rbac/units`)
    },

    update_user(user) {
        let o = {};
        o['name'] = user.name;
        o['update_roles'] = true;
        o['role_ids'] = user.roles.map(obj => obj.id);

        return axios.put(`/api/rbac/users/${user.id}`, o);
    },
    update_role(role) {
        let o = {};
        o['name'] = role.name;
        o['update_permissions'] = true;
        o['permission_ids'] = role.permissions.map(obj => obj.id);
        o['update_parents'] = true;
        o['parent_ids'] = role.parents.map(obj => obj.id);
        o['update_children'] = true;
        o['child_ids'] = role.children.map(obj => obj.id);
        o['update_users'] = true;
        o['user_ids'] = role.users.map(obj => obj.id);
        o['update_incompatible'] = true;
        o['incompatible_ids'] = role.incompatible_roles.map(obj => obj.id);

        return axios.put(`/api/rbac/roles/${role.id}`, o);
    },
    update_permission(permission) {
        let o = {};
        o['name'] = permission.name;
        o['update_roles'] = true;
        o['role_ids'] = permission.roles.map(obj => obj.id);
        o['update_units'] = true;
        o['unit_ids'] = permission.units.map(obj => obj.id);

        return axios.put(`/api/rbac/permissions/${permission.id}`, o);
    },
    update_unit(unit) {
        let o = {};
        o['name'] = unit.name;
        o['update_permissions'] = true;
        o['permission_ids'] = unit.permissions.map(obj => obj.id);

        return axios.put(`/api/rbac/units/${unit.id}`, o);
    },

    delete_user(id) {
        return axios.delete(`/api/rbac/users/${id}`);
    },
    delete_role(id) {
        return axios.delete(`/api/rbac/roles/${id}`);
    },
    delete_permission(id) {
        return axios.delete(`/api/rbac/permissions/${id}`);
    },
    delete_unit(id) {
        return axios.delete(`/api/rbac/units/${id}`);
    }
}

export {api};
