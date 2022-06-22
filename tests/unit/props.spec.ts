/* @ts-ignore */
import { mount } from '@vue/test-utils'
import VueSlider from '../../lib/vue-slider.vue'

describe('Props: value', () => {
  it('value', () => {
    const wrapper = mount(VueSlider, {
      props: { modelValue: 50 },
    })
    expect(wrapper.vm.modelValue).toBe(50)
    expect(wrapper.vm.dots[0].pos).toBe(50)
    wrapper.setProps({
      modelValue: 80,
    })
    expect(wrapper.vm.modelValue).toBe(80)
    expect(wrapper.vm.dots[0].pos).toBe(80)
  })
  it('data: Value[]', () => {
    const wrapper = mount(VueSlider, {
      props: {
        modelValue: 'A',
        data: ['A', 'B', 'C', 'D', 'E'],
      },
    })
    wrapper.vm.setValue('C')
    expect(wrapper.vm.getIndex()).toBe(2)
    expect(wrapper.vm.dots[0].pos).toBe(50)
  })
  it('data: object[]', () => {
    const wrapper = mount(VueSlider, {
      props: {
        modelValue: 1,
        data: [
          {
            label: 'A',
            otherLabel: 'a',
            value: 1,
          },
          {
            label: 'B',
            otherLabel: 'b',
            value: 2,
          },
          {
            label: 'C',
            otherLabel: 'c',
            value: 3,
          },
          {
            label: 'D',
            otherLabel: 'd',
            value: 4,
          },
          {
            label: 'E',
            otherLabel: 'e',
            value: 5,
          },
        ],
      },
    })
    expect(wrapper.vm.control!.markList[0].label).toBe('A')
    wrapper.vm.setValue(3)
    expect(wrapper.vm.getIndex()).toBe(2)
    expect(wrapper.vm.dots[0].pos).toBe(50)
    wrapper.setProps({
      dataLabel: 'otherLabel',
    })
    expect(wrapper.vm.control!.markList[0].label).toBe('a')
  })
  it('data: object', () => {
    const wrapper = mount(VueSlider, {
      props: {
        modelValue: '1',
        data: {
          '1': 'A',
          '2': 'B',
          '3': 'C',
          '4': 'D',
          '5': 'E',
        },
      },
    })
    expect(wrapper.vm.control!.markList[0].label).toBe('A')
    wrapper.setProps({
      modelValue: '3',
    })
    expect(wrapper.vm.getIndex()).toBe(2)
    expect(wrapper.vm.dots[0].pos).toBe(50)
  })
})
