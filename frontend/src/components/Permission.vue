<template>
    <div class="card permission">
        <div class="card-content">

            <b-field label="ID" class="info-column" style="width: 100px">
                <b-input v-model="id" disabled></b-input>
            </b-field>

            <b-field label="Name" class="info-column" style="width: 180px">
                <b-input v-model="name" :disabled="!edit_mode"></b-input>
            </b-field>

            <b-field label="Roles" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="roles"
                        :data="all_roles"
                        :autocomplete="edit_mode"
                        :open-on-focus="edit_mode"
                        :closable="edit_mode"
                        attached
                        field="name"
                        readonly>
                </b-taginput>
            </b-field>

            <b-field label="Units" class="info-column" style="width: 340px">
                <b-taginput
                        v-model="units"
                        :data="all_units"
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
    .permission {
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
            permission: { default: null }
        },
        data() {
            return {
                id: "-",
                name: "",
                units: [],
                roles: [],

                create_mode: false,
                edit_mode: false,
            }
        },
        mounted() {
            if (this.permission === null) {
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
                    this.$store.dispatch('delete_permission', this.id);
            },
            on_save() {
                if (this.create_mode) {
                    this.$store.dispatch('create_permission', {
                        name: this.name,
                        units: this.units,
                        roles: this.roles
                    });
                    this.reset_fields();
                }
                else {
                    this.$store.dispatch('update_permission', {
                        id: this.id,
                        name: this.name,
                        units: this.units,
                        roles: this.roles
                    });
                    this.edit_mode = false;
                }
            },
            reset_fields() {
                if (this.create_mode) {
                    this.name = "";
                    this.units = [];
                    this.roles = [];
                    return;
                }

                this.id = this.permission.id;
                this.name = this.permission.name;

                this.units = [];
                for (let unit of this.permission.units) {
                    this.units.push(
                        this.all_units.find(_unit => _unit.id === unit.id)
                    );
                }

                this.roles = [];
                for (let r of this.permission.roles) {
                    this.roles.push(
                        this.all_roles.find(_role => _role.id === r.id)
                    );
                }
            }
        },
        computed: {
            all_permissions() {
                return this.$store.getters.permissions;
            },
            all_units() {
                return this.$store.getters.units;
            },
            all_roles() {
                return this.$store.getters.roles;
            }
        }
    }
</script>
