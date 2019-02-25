<template>
  <div id="app">
    <navbar />
    <section class="content">
      <div class="markdown-body">
        <router-view />
        <page-footer />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from './components/Navbar.vue'
import PageFooter from './components/PageFooter.vue'

@Component({
  components: {
    Navbar,
    PageFooter
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './styles/var';
@import './styles/media';

@import './styles/markdown';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  font-size: 14px;
  font-family: Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;

  .content {
    flex: 1;
    overflow: auto;
  }

  .vue-slider:not(:first-child) {
    margin-top: 45px;
  }

  .markdown-body {
    font-family: inherit;
    max-width: 1040px;
    padding: 120px 60px 40px;
    margin: 0 auto;
    color: #34495e;
    @include max-screen(992px) {
      & {
        padding: 50px 25px 20px;
        width: 100%;
      }
    }

    p+h2, p+h3 {
      margin-top: 90px;
    }

    ol {
      margin-top: 30px;
    }

    code:not([class^="language-"]) {
      color: $main;
      padding: 3px 5px;
      margin: 0 2px;
      border-radius: 2px;
      white-space: nowrap;
    }
  }
}
</style>
