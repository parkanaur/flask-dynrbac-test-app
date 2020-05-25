<template>
    <div class="app">
        <div class="links">
            <router-link to="/" class="lnk">Главная</router-link>
            <router-link to="/users" class="lnk">Пользователи</router-link>
            <router-link to="/roles" class="lnk">Роли</router-link>
        </div>
        <loading v-if="$store.getters.loading_cnt > 0"/>
        <router-view v-show="$store.getters.loading_cnt === 0"/>
    </div>
</template>

<style lang="scss" scoped>
    .app {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .links {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 100px;
    }

    .lnk {
        font-size: 20px;
        margin-left: 10px;
        margin-right: 10px;
        &.router-link-exact-active {
            text-decoration: underline;
        }
    }
</style>

<script>
    import Loading from '@/components/Loading.vue';

    export default {
        components: {
            Loading
        }
    }
</script>
