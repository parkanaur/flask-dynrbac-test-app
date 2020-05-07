<template>
    <b-table :data="data" :columns="columns">

    </b-table>
</template>

<script>
    export default {
        name: "UserList",
        computed: {
            data() {
                return this.$store.getters.get_user_list() || [];
            },

            columns() {
                return [
                    {field: 'id', label: 'ID', width: 40, numeric: true},
                    {field: 'name', label: 'Name'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>