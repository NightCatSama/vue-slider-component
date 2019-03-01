import { Direction } from '../typings'
interface IPosObject {
  x: number
  y: number
}
export declare const toPx: (value: string | number) => string
export declare const getPos: (
  e: MouseEvent | TouchEvent,
  elem: HTMLDivElement,
  isReverse: boolean,
) => IPosObject
declare type HandleFunction = (i: number) => number
export declare const getKeyboardHandleFunc: (
  e: KeyboardEvent,
  params: {
    direction: Direction
    max: number
    min: number
  },
) => HandleFunction | null
export {}
