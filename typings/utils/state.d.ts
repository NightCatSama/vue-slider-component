export interface StateMap {
  [key: string]: number
}
export default class State {
  map: StateMap
  states: number
  constructor(map: StateMap)
  add(state: number): void
  delete(state: number): void
  toggle(state: number): void
  has(state: number): boolean
}
