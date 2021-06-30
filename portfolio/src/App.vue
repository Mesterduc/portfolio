<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <router-link to="/hej">hej </router-link> -->
  <app-nav-bar />
  <router-view />
  <!-- {{usestore}} <br>
  <input v-model="userInput" type="text" name="" id="">
  <button @click="saveName" type="submit">Submit</button> -->
</template>

<script lang="ts">
import appNavBar from './layout/navBar/appNavBar.vue'
import { defineComponent, ref, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    appNavBar
  },
  setup(){
    // const store = useStore()
    // const usestore = computed(() => store.state.user.name)
    // // const usestore2 = computed(() => useStore().state.)

    // const userInput = ref('')

    // function saveName() {
    //   store.dispatch('saveName', userInput.value)
    //   userInput.value = ''
    // }
    // return { usestore, userInput,saveName}

  }

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 10px;
  width: min((100vw - 64px), 100em);
    margin: auto;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
