import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VueSlider from '~/lib'
import VueSliderDot from '~/lib/vue-slider-dot'

describe('Lazy drag commits with updated bounds', () => {
  const cases = [
    { value: 50, index: 0, position: 85, dragged: [85], bounds: { max: 60 }, expected: 60 },
    { value: 50, index: 0, position: 15, dragged: [15], bounds: { min: 40 }, expected: 40 },
    {
      value: [20, 50],
      index: 1,
      position: 85,
      dragged: [20, 85],
      bounds: { max: 60 },
      expected: [20, 60],
    },
    {
      value: [50, 80],
      index: 0,
      position: 15,
      dragged: [15, 80],
      bounds: { min: 40 },
      expected: [40, 80],
    },
    { value: 50, index: 0, position: 45, dragged: [45], bounds: { min: 40 }, expected: 45 },
    {
      value: 'A',
      data: ['A', 'B', 'C'],
      index: 0,
      position: 85,
      dragged: ['C'],
      bounds: { max: 60 },
      expected: 'C',
    },
  ]

  cases.forEach(({ value, data, index, position, dragged, bounds, expected }) => {
    it(`commits ${JSON.stringify(expected)} after changing ${Object.keys(bounds)[0]}`, async () => {
      const wrapper = shallowMount(VueSlider, {
        propsData: { value, data, lazy: true, silent: true },
      })
      try {
        document.documentElement.scrollLeft = 0
        document.documentElement.scrollTop = 0
        const rail = wrapper.find('.vue-slider-rail').element as HTMLElement
        Object.defineProperty(rail, 'offsetWidth', { value: 100 })
        rail.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 10 } as DOMRect)
        wrapper.findAll(VueSliderDot).at(index).vm.$emit('drag-start')
        const moveEvent = new MouseEvent('mousemove', { clientX: position, clientY: 0 })
        Object.defineProperties(moveEvent, { pageX: { value: position }, pageY: { value: 0 } })
        document.dispatchEvent(moveEvent)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.control.dotsValue).to.deep.equal(dragged)
        await wrapper.setProps(bounds)
        document.dispatchEvent(new MouseEvent('mouseup'))
        await new Promise(resolve => setTimeout(resolve, 0))
        expect(wrapper.emitted('change')!.slice(-1)[0][0]).to.deep.equal(expected)
      } finally {
        wrapper.destroy()
      }
    })
  })
})
