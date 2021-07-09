<template>
  <button @click="show = !show">Toggle</button>
  <transition-group tag="div" class="VueOnly" name="fade" appear>
    <div class="graphs" v-for="boro in lotteriesByBorough" :key="boro.id">
      Item {{ boro.id }}
    </div>
  </transition-group>
</template>

<script>
let nextId = 0;
export default {
  name: "App",
  data() {
    return {
      show: true,
    };
  },
  computed: {
    lotteriesByBorough() {
      if (!this.show) return [];
      return [{ id: nextId++ }, { id: nextId++ }, { id: nextId++ }];
    },
  },
};
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
/* .fade-leave-active {
 	-webkit-transition: all 0.6s ease;
 	transition: all 0.6s ease;
    animation: fade-in 1s reverse;
 }
 .fade-enter-active {
 	-webkit-transition: all 0.6s ease !important;
 	transition: all 0.6s ease !important;
     animation: fade-in 1s;
    
}

.fade-enter-from {
	opacity: 0;
}
.fade-leave-to {
	opacity: 0;
}

.fade-move {
	-webkit-transition: -webkit-transform 0.6s;
	transition: -webkit-transform 0.6s;
	transition: transform 0.6s;
	transition: transform 0.6s, -webkit-transform 0.6s;
} */
/* .fade-enter-active {
  animation: fade-in 1s;
}

.fade-leave-active {
  animation: fade-in 1s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
    width: 0;
    background-color: blue;
  }
  to {
    opacity: 1;
    width: 100%;
  }
} */
</style>
