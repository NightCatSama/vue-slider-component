<template>
  <VueSlider v-model="value" :width="400"></VueSlider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueSlider from '../lib/vue-slider';

@Options({
  components: {
    VueSlider,
  },
})
export default class App extends Vue {
  value = 40
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
  margin: 100px auto;
}
</style>
