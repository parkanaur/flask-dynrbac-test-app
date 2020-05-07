<template>
    <div id="app">
        <b-navbar>
            <template slot="start">
                <b-navbar-item>
                    <router-link to="/users">Users</router-link>
                </b-navbar-item>
                <b-navbar-item>
                    <router-link to="/roles">Roles</router-link>
                </b-navbar-item>
                <b-navbar-item>
                    <router-link to="/permissions">Permissions</router-link>
                </b-navbar-item>
                <b-navbar-item>
                    <router-link to="/units">Units</router-link>
                </b-navbar-item>
            </template>
        </b-navbar>
      <div class="container">
        <router-view/>
      </div>
    </div>
</template>

<style lang="scss">
    @import url("https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css");
    @import url("https://use.fontawesome.com/releases/v5.2.0/css/all.css");

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
