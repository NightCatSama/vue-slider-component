declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*nav.json' {
  import { NavObj } from 'src/nav'
  const obj: NavObj
  export default obj
}

declare module '*.json' {
  const value: any
  export default value
}
