<template>
    <div class="loading">
        <img class="loading-img" src="https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png">
        Подождите идёт загрузка..
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

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loading-img {
        width: 300px;
        height: 300px;
        animation: rotating 5s linear infinite;
        margin-bottom: 100px;
    }
</style>

<script>
    export default {

    }
</script>