import { expect } from 'chai'
import Decimal from '~/lib/utils/decimal'

describe('Decimal', () => {
  it('0.1 + 0.2 = 0.3', () => {
    expect(new Decimal(0.1).plus(0.2).toNumber()).to.equal(0.3)
  })
  it('0.3 - 0.1 = 0.2', () => {
    expect(new Decimal(0.3).minus(0.1).toNumber()).to.equal(0.2)
  })
  it('0.1 * 3 = 0.3', () => {
    expect(new Decimal(0.1).multiply(3).toNumber()).to.equal(0.3)
  })
  it('0.3 / 0.1 = 3', () => {
    expect(new Decimal(0.3).divide(0.1).toNumber()).to.equal(3)
  })
})
