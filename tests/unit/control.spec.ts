import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VueSlider from '~/lib'

const getControl = () => {
  const wrapper = shallowMount(VueSlider)
  return wrapper.vm.control
}

describe('Control', () => {
  it('Event: initControl', () => {
    expect(getControl()).to.not.equal(null)
  })
  it('Method: setDotPos', () => {
    const control = getControl()
    control.setDotPos(50, 0)
    expect(control.dotsValue[0]).to.equal(50)
  })
  it('Method: parseValue', () => {
    const control = getControl()
    const value = control.parseValue(50)
    expect(value).to.equal(50)
  })
  it('Method: parsePos', () => {
    const control = getControl()
    const value = control.parsePos(50)
    expect(value).to.equal(50)
  })
  it('Method: setValue & syncDotsPos', () => {
    const control = getControl()
    control.setValue(50)
    expect(control.dotsPos).to.deep.equal([50])
    control.setValue([0, 50])
    expect(control.dotsPos).to.deep.equal([0, 50])
  })
  it('Method: getRecentDot', () => {
    const control = getControl()
    control.setValue([0, 100])
    expect(control.getRecentDot(20)).to.deep.equal(0)
    expect(control.getRecentDot(90)).to.deep.equal(1)
  })
  it('Method: getIndexByValue', () => {
    const control = getControl()
    control.interval = 10
    expect(control.getIndexByValue(20)).to.deep.equal(2)
    expect(control.getIndexByValue(100)).to.deep.equal(10)
  })
  it('Method: getIndexByValue & getValueByIndex', () => {
    const control = getControl()
    control.interval = 10
    expect(control.getIndexByValue(20)).to.deep.equal(2)
    expect(control.getValueByIndex(2)).to.deep.equal(20)
  })
  it('Method: isActiveByPos', () => {
    const control = getControl()
    control.setValue([0, 60])
    expect(control.isActiveByPos(40)).to.equal(true)
    expect(control.isActiveByPos(80)).to.equal(false)
  })
  it('Param: minRange', () => {
    const control = getControl()
    control.setValue([0, 100])
    control.minRange = 80
    control.setDotPos(70, 1)
    expect(control.dotsValue[1]).to.equal(80)
  })
  it('Param: maxRange', () => {
    const control = getControl()
    control.setValue([0, 20])
    control.maxRange = 50
    control.setDotPos(100, 1)
    expect(control.dotsValue[0]).to.equal(80)
  })
  it('Param: fixed', () => {
    const control = getControl()
    control.setValue([0, 40])
    control.fixed = true
    control.setDotPos(30, 0)
    expect(control.dotsValue[1]).to.equal(70)
  })
  it('Param: order', () => {
    const control = getControl()
    control.setValue([0, 40])
    control.order = false
    control.setDotPos(80, 0)
    expect(control.dotsValue).to.deep.equal([80, 40])
  })
})
