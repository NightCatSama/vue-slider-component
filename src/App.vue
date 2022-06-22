<template>
  <div>
    <vue-slider v-model="value" :marks="marks" tooltip="always">
      <template v-slot:label="{ label, active }">
        <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ label }}</div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-label {
  }
  .custom-label.active {
    color: #3498db;
  }
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueSlider from '../lib/vue-slider.vue';
import '../lib/theme/default.scss';

@Options({
  components: {
    VueSlider,
  },
})
export default class App extends Vue {
  value = 40;
  marks = val => val % 20 === 0;
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
