<template>
    <div class="users-container">
        <div class="title">Create a user</div>
        <user/>
        <div class="title" style="margin-top: 50px">Existing users</div>
        <transition-group name="list-complete" tag="div" class="users">
            <user v-for="user in reversedUsers" :user="user" :key="user.id" class="list-complete-item"/>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
    .users-container {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .users {
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
    import User from '@/components/User.vue';

    export default {
        mounted() {
            this.$store.dispatch("reload_users");
            this.$store.dispatch("reload_roles");
        },
        computed: {
            users() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.users;
            },
            reversedUsers() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.users.slice().reverse();
            }
        },
        components: {
            User
        }
    }
</script>
