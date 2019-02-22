import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VueSlider from 'lib'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(VueSlider, {
      propsData: { value: 50 },
    })
    expect(wrapper.vm.value).to.equal(50)
  })
})
