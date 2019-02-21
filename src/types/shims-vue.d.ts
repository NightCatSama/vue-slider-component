declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*nav.json' {
  const obj: NavObj
  export default obj
}

declare module '*.json' {
  const value: any
  export default value
}
