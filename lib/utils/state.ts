export interface StateMap {
  [key: string]: number
}

export default class State {
  map: StateMap
  states: number = 0

  constructor(map: StateMap) {
    this.map = map
  }

  add(state: number) {
    this.states |= state
  }

  delete(state: number) {
    this.states &= ~state
  }

  toggle(state: number) {
    if (this.has(state)) {
      this.delete(state)
    } else {
      this.add(state)
    }
  }

  has(state: number): boolean {
    return !!(this.states & state)
  }
}
