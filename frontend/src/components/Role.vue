<template>
    <div class="card role">
        <div class="card-content">

            <b-field label="ID" class="info-column" style="width: 100px">
                <b-input v-model="id" disabled></b-input>
            </b-field>

            <b-field label="Name" class="info-column" style="width: 180px">
                <b-input v-model="name" :disabled="!edit_mode"></b-input>
            </b-field>

            <b-field label="Permissions" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="permissions"
                        :data="all_permissions"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

            <b-field label="Users" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="users"
                        :data="all_users"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

            <b-field label="Parents" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="parents"
                        :data="all_roles"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

            <b-field label="Children" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="children"
                        :data="all_roles"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

            <b-field label="Incompatible roles" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="incompatible_roles"
                        :data="all_roles"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

        </div>
        <div class="card-content">
            <b-field label="‎ " class="crud-btn">
                <b-button type="is-success" icon-right="content-save-outline" @click="on_save" :disabled="!edit_mode">
                    {{ create_mode ? "Create": "Save"}}
                </b-button>
            </b-field>

            <b-field label="‎ " class="crud-btn" v-if="!create_mode">
                <b-button type="is-warning" icon-right="cancel" @click="on_cancel" :disabled="!edit_mode">
                    Cancel
                </b-button>
            </b-field>

            <b-field label="‎ " class="crud-btn" v-if="!create_mode">
                <b-button type="is-primary" icon-right="square-edit-outline" @click="edit_mode=true" :disabled="edit_mode">
                    Edit
                </b-button>
            </b-field>

            <b-field label="‎ " class="crud-btn" v-if="!create_mode">
                <b-button type="is-danger" icon-right="delete" @click="on_delete">
                    Delete
                </b-button>
            </b-field>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .role {
        width: 100%;
        margin-bottom: 20px;
        .card-content {
            display: flex;
        }
    }

    .info-column {
        margin-left: 30px;
        &:first-child {
            margin-left: 0;
        }
    }

    .crud-btn {
        margin-left: 20px;
    }
</style>

<script>
    export default {
        props: {
            role: { default: null }
        },
        data() {
            return {
                id: "-",
                name: "",
                permissions: [],
                users: [],
                parents: [],
                children: [],
                incompatible_roles: [],

                create_mode: false,
                edit_mode: false,
            }
        },
        mounted() {
            if (this.role === null) {
                this.create_mode = true;
                this.edit_mode = true;
            }
            this.reset_fields();
        },
        methods: {
            on_cancel() {
                this.reset_fields();
                this.edit_mode = false;
            },
            on_delete() {
                if (confirm("Are you sure?"))
                    this.$store.dispatch('delete_role', this.id);
            },
            on_save() {
                if (this.create_mode) {
                    this.$store.dispatch('create_role', {
                        name: this.name,
                        permissions: this.permissions,
                        parents: this.parents,
                        users: this.users,
                        children: this.children,
                        incompatible_roles: this.incompatible_roles
                    });
                    this.reset_fields();
                }
                else {
                    this.$store.dispatch('update_role', {
                        id: this.id,
                        name: this.name,
                        permissions: this.permissions,
                        parents: this.parents,
                        users: this.users,
                        children: this.children,
                        incompatible_roles: this.incompatible_roles
                    });
                    this.edit_mode = false;
                }
            },
            reset_fields() {
                if (this.create_mode) {
                    this.name = "";
                    this.permissions = [];
                    this.users = [];
                    this.children = [];
                    this.parents = [];
                    this.incompatible_roles = [];
                    return;
                }

                this.id = this.role.id;
                this.name = this.role.name;

                this.permissions = [];
                for (let permission of this.role.permissions) {
                    this.permissions.push(
                        this.all_permissions.find(_permission => _permission.id === permission.id)
                    );
                }

                this.users = [];
                for (let user of this.role.users) {
                    this.users.push(
                        this.all_users.find(_user => _user.id === user.id)
                    );
                }

                this.parents = [];
                for (let parent of this.role.parents) {
                    this.parents.push(
                        this.all_roles.find(_role => _role.id === parent.id)
                    );
                }

                this.children = [];
                for (let child of this.role.children) {
                    this.children.push(
                        this.all_roles.find(_role => _role.id === child.id)
                    );
                }

                this.incompatible_roles = [];
                for (let r of this.role.incompatible_roles) {
                    this.incompatible_roles.push(
                        this.all_roles.find(_role => _role.id === r.id)
                    );
                }
            }
        },
        computed: {
            all_permissions() {
                return this.$store.getters.permissions;
            },
            all_users() {
                return this.$store.getters.users;
            },
            all_roles() {
                return this.$store.getters.roles;
            }
        }
    }
</script>
