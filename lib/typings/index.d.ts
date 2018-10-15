import VueSlider from '../vue-slider'

export interface Styles {
  [key: string]: any
}

export type TDirection = 'ltr' | 'rtl' | 'ttb' | 'btt'

export type TValue = number | string | symbol

// Mark
export interface MarkOption {
  label: TValue
  style?: Styles
  activeStyle?: Styles
  labelStyle?: Styles
  labelActiveStyle?: Styles
}
export interface Mark extends MarkOption {
  active?: boolean
  pos?: number
}
export interface Marks {
  [key: string]: string | MarkOption
}
export type MarksFunction = (value: TValue) => boolean | MarkOption
export type MarksProp = boolean | Marks | TValue[] | MarksFunction

// Dot
export interface DotStyle {
  style?: Styles
  focusStyle?: Styles
  disabledStyle?: Styles
}
export interface DotOption extends DotStyle {
  disabled: boolean
}
export interface Dot extends DotOption {
  pos: number
  value: TValue
  focus: boolean
}

export type ProcessProp = (dotsPos: number[]) => Array<[number, number]>

export default VueSlider
