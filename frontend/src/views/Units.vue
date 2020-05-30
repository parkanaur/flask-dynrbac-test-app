<template>
    <div class="units-container">
        <div class="title">Create a unit</div>
        <unit/>
        <div class="title" style="margin-top: 50px">Existing permissions</div>
        <transition-group name="list-complete" tag="div" class="units">
            <unit v-for="unit in reversedUnits" :unit="unit" :key="unit.id" class="list-complete-item"/>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
    .units-container {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .units {
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
    import Unit from '@/components/Unit.vue';

    export default {
        mounted() {
            this.$store.dispatch("reload_units");
            this.$store.dispatch("reload_permissions");
        },
        computed: {
            units() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.units;
            },
            reversedUnits() {
                return this.$store.getters.loading_cnt > 0 ? [] : this.$store.getters.units.slice().reverse();
            }
        },
        components: {
            Unit
        }
    }
</script>
