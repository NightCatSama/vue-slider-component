<template>
  <div id="app">
    <navbar></navbar>
    <article class="markdown-body">
      <router-view></router-view>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import navbar from './components/navbar.vue'

@Component({
  components: {
    navbar
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './styles/media';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  font-family: Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
  color: #2c3e50;
  overflow: hidden;

  .markdown-body {
    font-family: inherit;
    flex: 1;
    padding: 50px 80px;
    overflow: auto;
    @include max-screen(992px) {
      & {
        padding: 30px 20px 20px;
      }
    }
  }
}
</style>
