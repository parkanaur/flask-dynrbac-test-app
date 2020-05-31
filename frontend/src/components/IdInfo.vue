<template>
    <div class="idinfo">
        <b-field label="Current user ID">
            <b-input v-model="user_id"></b-input>
        </b-field>
        <b-button type="is-success" @click="on_save">
            Save user ID
        </b-button>
    </div>
</template>

<style lang="scss" scoped>
    .idinfo {
        margin-bottom: 50px;
    }
</style>

<script>
    export default {
        mounted() {
            this.$store.dispatch("reload_user_id");
        },
        data() {
            return {
                user_id: this.$store.getters.user_id
            }
        },
        methods: {
            on_save() {
                this.$store.dispatch('update_user_id', this.user_id);
            }
        },
        computed: {
            all_user_ids() {
                return this.$store.getters.users.map(u => u.id);
            }
        }
    }
</script>