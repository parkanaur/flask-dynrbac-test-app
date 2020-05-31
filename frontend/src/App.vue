<template>
    <div class="app">
        <div class="links">
            <router-link to="/" class="lnk">Index</router-link>
            <router-link to="/users" class="lnk">Users</router-link>
            <router-link to="/roles" class="lnk">Roles</router-link>
            <router-link to="/permissions" class="lnk">Permissions</router-link>
            <router-link to="/units" class="lnk">Units</router-link>
            <a href="/api/test_unit1" class="lnk lnk-orange">Unit 1</a>
            <a href="/api/test_unit2" class="lnk lnk-orange">Unit 2</a>
        </div>
        <IdInfo></IdInfo>
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

    .lnk-orange {
        font-size: 20px;
        margin-left: 10px;
        margin-right: 10px;
        color: orange;
    }
</style>

<script>
    import Loading from '@/components/Loading.vue';
    import IdInfo from '@/components/IdInfo.vue';

    export default {
        components: {
            Loading,
            IdInfo
        }
    }
</script>
