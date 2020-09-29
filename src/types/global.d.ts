declare module '*nav.json' {
  import { NavObj } from 'src/nav'
  const obj: NavObj
  export default obj
}

declare module '*.json' {
  const value: any
  export default value
}

declare module 'vuep' {
  const value: any
  export default value
}
