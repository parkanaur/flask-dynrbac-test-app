const axios = require('axios').default;

const api = {
    get_users() {
        return axios.get(`/api/rbac/users`)
    },
    get_roles() {
        return axios.get(`/api/rbac/roles`)
    },
    get_permissions() {
        return axios.get(`/api/rbac/permissions`)
    },
    get_units() {
        return axios.get(`/api/rbac/units`)
    },

    create_user(user) {
        return axios.post(`/api/rbac/users`, {
            name: user.name,
            role_ids: user.roles.map(obj => obj.id)
        });
    },
    create_role(role) {
        return axios.post(`/api/rbac/roles`, {
            name: role.name,
            permission_ids: role.permissions.map(obj => obj.id),
            parent_ids: role.parents.map(obj => obj.id),
            child_ids: role.children.map(obj => obj.id),
            user_ids: role.users.map(obj => obj.id),
            incompatible_ids: role.incompatible_roles.map(obj => obj.id)
        });
    },
    create_permission(permission) {
        return axios.post(`/api/rbac/permissions`, {
            name: permission.name,
            role_ids: permission.roles.map(obj => obj.id),
            unit_ids:  permission.units.map(obj => obj.id)
        });
    },
    create_unit(unit) {
        return axios.post(`/api/rbac/units`, {
            name: unit.name,
            permission_ids: unit.permissions.map(obj => obj.id)
        });
    },

    update_user(user) {
        return axios.put(`/api/rbac/users/${user.id}`, {
            name: user.name,
            update_roles: true,
            role_ids: user.roles.map(obj => obj.id)
        });
    },
    update_role(role) {
        return axios.put(`/api/rbac/roles/${role.id}`, {
            name: role.name,
            update_permissions: true,
            permission_ids: role.permissions.map(obj => obj.id),
            update_parents: true,
            parent_ids: role.parents.map(obj => obj.id),
            update_children: true,
            child_ids: role.children.map(obj => obj.id),
            update_users: true,
            user_ids: role.users.map(obj => obj.id),
            update_incompatible: true,
            incompatible_ids: role.incompatible_roles.map(obj => obj.id)
        });
    },
    update_permission(permission) {
        return axios.put(`/api/rbac/permissions/${permission.id}`, {
            name: permission.name,
            update_roles: true,
            role_ids: permission.roles.map(obj => obj.id),
            update_units: true,
            unit_ids:  permission.units.map(obj => obj.id)
        });
    },
    update_unit(unit) {
        return axios.put(`/api/rbac/units/${unit.id}`, {
            name: unit.name,
            update_permissions: true,
            permission_ids: unit.permissions.map(obj => obj.id)
        });
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
