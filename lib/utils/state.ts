export interface StateMap {
  [key: string]: number
}

export default class State {
  map: StateMap
  states: number = 0

  constructor(map: StateMap) {
    this.map = map
  }

  // 设置状态
  add(state: number) {
    this.states |= state
  }

  // 移除状态
  delete(state: number) {
    this.states &= ~state
  }

  // 切换状态
  toggle(state: number) {
    if (this.has(state)) {
      this.delete(state)
    } else {
      this.add(state)
    }
  }

  // 判断是否存在该状态
  has(state: number): boolean {
    return !!(this.states & state)
  }
}
