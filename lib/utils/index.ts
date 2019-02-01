import { Direction } from '../typings'

interface IPosObject {
  x: number
  y: number
}

// 将数字或字符串格式化成像素格式
export const toPx = (value: number | string): string => {
  return typeof value === 'number' ? `${value}px` : value
}

// 得到当前鼠标在元素中的位置
export const getPos = (
  e: MouseEvent | TouchEvent | any, // NOTE: safari not support TouchEvent
  elem: HTMLDivElement,
  isReverse: boolean,
): IPosObject => {
  const event = e.targetTouches ? e.targetTouches[0] : e
  const posObj = {
    x: event.pageX - elem.offsetLeft,
    y: event.pageY - elem.offsetTop,
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
// TODO: 键盘处理逻辑
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
