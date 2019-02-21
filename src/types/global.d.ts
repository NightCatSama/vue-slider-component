interface Nav {
  emoji?: string
  name: string
  route: string
  component: string
}
interface NavObj {
  [key: string]: Nav[]
}
