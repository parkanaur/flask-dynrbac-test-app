<template>
    <div class="roles-container">
        <div class="title">Create a role</div>
        <role/>
        <div class="title" style="margin-top: 50px">Existing roles</div>
        <transition-group name="list-complete" tag="div" class="roles">
            <role v-for="role in reversedRoles" :role="role" :key="role.id" class="list-complete-item"/>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
    .roles-container {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .roles {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .list-complete-item {
        transition: all 1s;
        display: inline-block;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }
</style>

<script>
    import Role from '@/components/Role.vue';

    export default {
        mounted() {
            this.$store.dispatch("reload_roles");
            this.$store.dispatch("reload_permissions");
            this.$store.dispatch("reload_users");
        },
        computed: {
            roles() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.roles;
            },
            reversedRoles() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.roles.slice().reverse();
            }
        },
        components: {
            Role
        }
    }
</script>
