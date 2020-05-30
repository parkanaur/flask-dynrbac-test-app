<template>
    <div class="permissions-container">
        <div class="title">Create a permission</div>
        <permission/>
        <div class="title" style="margin-top: 50px">Existing permissions</div>
        <transition-group name="list-complete" tag="div" class="permissions">
            <permission v-for="permission in reversedPermissions" :permission="permission" :key="permission.id" class="list-complete-item"/>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
    .permissions-container {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .permissions {
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
    import Permission from '@/components/Permission.vue';

    export default {
        mounted() {
            this.$store.dispatch("reload_permissions");
            this.$store.dispatch("reload_roles");
            this.$store.dispatch("reload_units");
        },
        computed: {
            permissions() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.permissions;
            },
            reversedPermissions() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.permissions.slice().reverse();
            }
        },
        components: {
            Permission
        }
    }
</script>
