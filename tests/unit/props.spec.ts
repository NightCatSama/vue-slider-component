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
  })
})
