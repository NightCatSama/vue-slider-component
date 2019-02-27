<template>
  <section class="demo-wrap">
    <div class="demo-header">
      <div class="code-btn" @click="switchCodeShow"></div>
    </div>
    <div class="demo-content" ref="content">
      <vuep
        class="demo-vuep"
        :value="value"
        :scope="scope"
      ></vuep>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueSlider from '../../lib/'

@Component({})
export default class ExampleData extends Vue {

  scope = { VueSlider }

  @Prop({ required: true })
  value!: string

  switchCodeShow() {
    const el = (this.$refs.content as HTMLDivElement).querySelector('.vuep-editor')
    if (el) {
      el.classList.toggle('show')
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/var';
  @import '../styles/media';
  .demo-wrap {
    border-radius: 4px;
    overflow: hidden;
    .demo-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 48px;
      background-color: #f6f6f6;
      padding: 0 20px;
      .code-btn {
        width: 20px;
        height: 20px;
        background-image: url('../assets/code.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
      }
    }
    .demo-content {
      background-color: #eee;
      padding: 20px;
      display: flex;
      flex-direction: column;

      @include max-screen(992px) {
        & {
          padding: 10px;
        }
      }
      .demo-code {
        padding-bottom: 10px;
      }
    }
    .demo-vuep {
      display: flex;
      flex-direction: column;
      height: auto;
      .vuep-editor {
        width: 100%;
        font-size: 14px;
        border-radius: 4px;
        max-height: 0;
        margin: 0;
        transition: all .5s ease;

        &.show {
          max-height: 500px;
          margin-bottom: 10px;
        }
      }
      .vuep-preview {
        width: 100%;
        height: auto;
        overflow: visible;
        margin: 0;
        border-radius: 4px;
        background-color: #fff;
        z-index: 9;

        @include max-screen(992px) {
          & {
            padding: 10px;
          }
        }
      }
    }
  }
</style>