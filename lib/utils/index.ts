import { Direction } from '../typings'

interface IPosObject {
  x: number
  y: number
}

export const getSize = (value: number | string): string => {
  return typeof value === 'number' ? `${value}px` : value
}

/** Get the distance of the element from the top/left of the page */
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

/**
 * Get the position of the mouse/finger in the element
 * @param e Trigger event
 * @param elem Container element
 * @param isReverse From the right/bottom
 */
export const getPos = (
  e: MouseEvent | TouchEvent,
  elem: HTMLDivElement,
  isReverse: boolean,
  zoom: number = 1,
): IPosObject => {
  const event = 'targetTouches' in e ? e.targetTouches[0] : e
  const offset = getOffset(elem)
  const posObj = {
    x: event.pageX - offset.x,
    y: event.pageY - offset.y,
  }
  return {
    x: isReverse ? elem.offsetWidth * zoom - posObj.x : posObj.x,
    y: isReverse ? elem.offsetHeight * zoom - posObj.y : posObj.y,
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
export type HandleFunction = (index: number) => number
export const getKeyboardHandleFunc = (
  e: KeyboardEvent,
  params: {
    direction: Direction
    max: number
    min: number
    hook: (e: KeyboardEvent) => HandleFunction | boolean
  },
): HandleFunction | null => {
  if (params.hook) {
    const result = params.hook(e)
    if (typeof result === 'function') return result
    if (!result) return null
  }
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
