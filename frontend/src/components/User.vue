<template>
    <div class="card user">
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
    .user {
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
            user: { default: null }
        },
        data() {
            return {
                id: "-",
                name: "",
                roles: [],

                create_mode: false,
                edit_mode: false,
            }
        },
        mounted() {
            if (this.user === null) {
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
                    this.$store.dispatch('delete_user', this.id);
            },
            on_save() {
                this.$store.dispatch('update_user', {
                    id: this.id,
                    name: this.name,
                    roles: this.roles
                });
                if (this.create_mode)
                    this.reset_fields();
                else
                    this.edit_mode = false;
            },
            reset_fields() {
                if (this.create_mode) {
                    this.name = "";
                    this.roles = [];
                    return;
                }

                this.id = this.user.id;
                this.name = this.user.name;

                this.roles = [];
                for (let role of this.user.roles) {
                    this.roles.push(
                        this.all_roles.find(_role => _role.id === role.id)
                    );
                }
            }
        },
        computed: {
            all_roles() {
                return this.$store.getters.roles;
            }
        }
    }
</script>