import { expect } from 'chai'
import Decimal from '~/lib/utils/decimal'

describe('Decimal', () => {
  it('0.1 + 0.2 = 0.3', () => {
    expect(new Decimal(0.1).plus(0.2).toNumber()).to.equal(0.3)
  })
})
