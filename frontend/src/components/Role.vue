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
                <b-dropdown v-model="permissions"
                            multiple
                            :disabled="!edit_mode"
                            aria-role="list">

                    <button class="button is-primary" type="button" slot="trigger">
                        <span>Selected ({{ permissions.length }})</span>
                        <b-icon icon="menu-down"></b-icon>
                    </button>

                    <b-dropdown-item :value="perm" aria-role="listitem" v-for="perm in all_permissions" :key="perm.id">
                        <span>{{perm.name}}</span>
                    </b-dropdown-item>

                </b-dropdown>
            </b-field>

            <b-field label="‎ " class="crud-btn">
                <b-button type="is-success" icon-right="content-save-outline" @click="on_save" :disabled="!edit_mode">
                    Save
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
                this.$store.dispatch('update_role', {
                    id: this.id,
                    name: this.name,
                    permissions: this.permissions
                });
                if (this.create_mode)
                    this.reset_fields();
                else
                    this.edit_mode = false;
            },
            reset_fields() {
                if (this.create_mode) {
                    this.name = "";
                    this.permissions = [];
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
            }
        },
        computed: {
            all_permissions() {
                return this.$store.getters.permissions;
            }
        }
    }
</script>
