<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <router-link to="/hej">hej </router-link> -->
  <app-nav-bar />
  <router-view />
</template>

<script lang="ts">
import appNavBar from './layout/navBar/appNavBar.vue'
import { defineComponent } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    appNavBar
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
