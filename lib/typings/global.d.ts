import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      'vue-slider-dot': any
      'vue-slider-mark': any
      div: any
      span: any
      input: any
      template: any
    }
  }
}

declare module '*.scss' {
  var content: any
  export default content
}
