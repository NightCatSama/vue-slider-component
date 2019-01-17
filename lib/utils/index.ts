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
  e: MouseEvent | TouchEvent,
  elem: HTMLDivElement,
  isReverse: boolean,
): IPosObject => {
  const event = e instanceof TouchEvent ? e.targetTouches[0] : e
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
type HandleFunction = () => null
// TODO: 键盘处理逻辑
export const getKeyboardHandleFunc = (e: KeyboardEvent): HandleFunction | null => {
  switch (e.keyCode) {
    case KEY_CODE.UP:
    case KEY_CODE.RIGHT:
      return () => null

    case KEY_CODE.DOWN:
    case KEY_CODE.LEFT:
      return () => null

    case KEY_CODE.END:
      return () => null
    case KEY_CODE.HOME:
      return () => null
    case KEY_CODE.PAGE_UP:
      return () => null
    case KEY_CODE.PAGE_DOWN:
      return () => null

    default:
      return null
  }
}
