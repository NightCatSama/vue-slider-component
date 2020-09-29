import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VueSlider from '~/lib'

describe('Props: value', () => {
  it('value', () => {
    const wrapper = shallowMount(VueSlider, {
      propsData: { value: 50 },
    })
    expect(wrapper.vm.value).to.equal(50)
    expect(wrapper.vm.dots[0].pos).to.equal(50)
    wrapper.setProps({
      value: 80,
    })
    expect(wrapper.vm.value).to.equal(80)
    expect(wrapper.vm.dots[0].pos).to.equal(80)
  })
  it('data: Value[]', () => {
    const wrapper = shallowMount(VueSlider, {
      propsData: {
        value: 'A',
        data: ['A', 'B', 'C', 'D', 'E'],
      },
    })
    wrapper.vm.setValue('C')
    expect(wrapper.vm.getIndex()).to.equal(2)
    expect(wrapper.vm.dots[0].pos).to.equal(50)
  })
  it('data: object[]', () => {
    const wrapper = shallowMount(VueSlider, {
      propsData: {
        value: 1,
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
    expect(wrapper.vm.control.markList[0].label).to.equal('A')
    wrapper.vm.setValue(3)
    expect(wrapper.vm.getIndex()).to.equal(2)
    expect(wrapper.vm.dots[0].pos).to.equal(50)
    wrapper.setProps({
      dataLabel: 'otherLabel',
    })
    expect(wrapper.vm.control.markList[0].label).to.equal('a')
  })
  it('data: object', () => {
    const wrapper = shallowMount(VueSlider, {
      propsData: {
        value: '1',
        data: {
          '1': 'A',
          '2': 'B',
          '3': 'C',
          '4': 'D',
          '5': 'E',
        },
      },
    })
    expect(wrapper.vm.control.markList[0].label).to.equal('A')
    wrapper.setProps({
      value: '3',
    })
    expect(wrapper.vm.getIndex()).to.equal(2)
    expect(wrapper.vm.dots[0].pos).to.equal(50)
  })
})
