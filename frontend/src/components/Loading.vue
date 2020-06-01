<template>
    <div class="loading">
        <hour-glass size="100px"></hour-glass>
        Loading...
    </div>
</template>

<style lang="scss" scoped>
    .loading {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 100px;
    }
</style>

<script>
    import {HourGlass} from 'vue-loading-spinner';

    export default {
        components: {
            HourGlass
        }
    }
</script>