import { Direction } from '../typings'

interface IPosObject {
  x: number
  y: number
}

export const getSize = (value: number | string): string => {
  return typeof value === 'number' ? `${value}px` : value
}

export const getOffset = (elem: HTMLDivElement): IPosObject => {
  const doc = document.documentElement as HTMLElement
  const body = document.body as HTMLElement
  const rect = elem.getBoundingClientRect()
  const offset: IPosObject = {
    y: rect.top + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || body.clientTop || 0),
    x:
      rect.left + (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0),
  }
  return offset
}

export const getPos = (
  e: MouseEvent | TouchEvent,
  elem: HTMLDivElement,
  isReverse: boolean,
): IPosObject => {
  const event = 'targetTouches' in e ? e.targetTouches[0] : e
  const offset = getOffset(elem)
  const posObj = {
    x: event.pageX - offset.x,
    y: event.pageY - offset.y,
  }
  return {
    x: isReverse ? elem.offsetWidth - posObj.x : posObj.x,
    y: isReverse ? elem.offsetHeight - posObj.y : posObj.y,
  }
}

const enum KEY_CODE {
  PAGE_UP = 33,
  PAGE_DOWN,
  END,
  HOME,
  LEFT,
  UP,
  RIGHT,
  DOWN,
}
type HandleFunction = (i: number) => number
export const getKeyboardHandleFunc = (
  e: KeyboardEvent,
  params: {
    direction: Direction
    max: number
    min: number
  },
): HandleFunction | null => {
  switch (e.keyCode) {
    case KEY_CODE.UP:
      return i => (params.direction === 'ttb' ? i - 1 : i + 1)
    case KEY_CODE.RIGHT:
      return i => (params.direction === 'rtl' ? i - 1 : i + 1)
    case KEY_CODE.DOWN:
      return i => (params.direction === 'ttb' ? i + 1 : i - 1)
    case KEY_CODE.LEFT:
      return i => (params.direction === 'rtl' ? i + 1 : i - 1)

    case KEY_CODE.END:
      return () => params.max
    case KEY_CODE.HOME:
      return () => params.min

    case KEY_CODE.PAGE_UP:
      return i => i + 10
    case KEY_CODE.PAGE_DOWN:
      return i => i - 10

    default:
      return null
  }
}
