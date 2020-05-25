let PERMISSIONS_MOCK = [
    { id: 1, name: "Какать"},
    { id: 2, name: "Пукать"},
    { id: 3, name: "Жульничать"}
]

let PERMISSIONS_NEXT_ID = 4;

let ROLES_MOCK = [
    {
        id: 1,
        name: "Бомж",
        permissions: [ PERMISSIONS_MOCK[0], PERMISSIONS_MOCK[1] ]
    },
    {
        id: 2,
        name: "Лох",
        permissions: [ PERMISSIONS_MOCK[0] ]
    },
    {
        id: 3,
        name: "Мошенник",
        permissions: [ PERMISSIONS_MOCK[1], PERMISSIONS_MOCK[2] ]
    }
]

let ROLES_NEXT_ID = 4;

let USERS_MOCK = [
    {
        id: 1,
        name: "Петр",
        roles: [ ROLES_MOCK[0], ROLES_MOCK[1] ]
    },
    {
        id: 2,
        name: "Идар",
        roles: [ ROLES_MOCK[1], ROLES_MOCK[2] ]
    },
]

let USERS_NEXT_ID = 3;

const LOADING_TIMEOUT = 1000;

function deep_copy(data) {
    return JSON.parse(JSON.stringify(data));
}

const api = {
    get_permissions() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(deep_copy(PERMISSIONS_MOCK)), LOADING_TIMEOUT);
        })
    },
    get_roles() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(deep_copy(ROLES_MOCK)), LOADING_TIMEOUT);
        })
    },
    get_users() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(deep_copy(USERS_MOCK)), LOADING_TIMEOUT);
        })
    },

    update_user(user) {
        let ind = USERS_MOCK.findIndex(u => u.id === user.id);
        let cpy = deep_copy(user);
        if (ind === -1) {
            cpy.id = USERS_NEXT_ID++;
            USERS_MOCK.push(cpy);
        } else
            USERS_MOCK[ind] = cpy;
        return deep_copy(cpy);
    },
    update_role(role) {
        let ind = ROLES_MOCK.findIndex(r => r.id === role.id);
        let cpy = deep_copy(role);
        if (ind === -1) {
            cpy.id = ROLES_NEXT_ID++;
            ROLES_MOCK.push(cpy);
        } else
            ROLES_MOCK[ind] = cpy;
        return deep_copy(cpy);
    },

    delete_user(id) {
        let ind = USERS_MOCK.findIndex(u => u.id === id);
        USERS_MOCK.splice(ind, 1);
    },
    delete_role(id) {
        let ind = ROLES_MOCK.findIndex(r => r.id === id);
        ROLES_MOCK.splice(ind, 1);
    }
}

export {api};