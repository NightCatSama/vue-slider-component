import Decimal from '../../lib/utils/decimal'

describe('Decimal', () => {
  it('add', () => {
    expect(new Decimal(0.1).plus(0.2).toNumber()).toBe(0.3)
    expect(new Decimal(0.1).plus(0.2).toNumber()).toBe(0.3)
  })
  it('minus', () => {
    expect(new Decimal(0.3).minus(0.1).toNumber()).toBe(0.2)
    expect(new Decimal(1.5).minus(1.2).toNumber()).toBe(0.3)
  })
  it('multiply', () => {
    expect(new Decimal(1).multiply(0.3).toNumber()).toBe(0.3)
    expect(new Decimal(0.3).multiply(0.75).toNumber()).toBe(0.225)
    expect(new Decimal(9999999.99995).multiply(100000).toNumber()).toBe(999999999995)
    expect(new Decimal(9999999.99998).multiply(100000).toNumber()).toBe(999999999998)
  })
  it('divide', () => {
    expect(new Decimal(0.3).divide(0.1).toNumber()).toBe(3)
    expect(new Decimal(123456789123456789).divide(10).toNumber()).toBe(12345678912345678.9)
    expect(new Decimal(0.333).divide(0.01).toNumber()).toBe(33.3)
  })
  it('remainder', () => {
    expect(new Decimal(0.3).remainder(0.1).toNumber()).toBe(0)
    expect(new Decimal(1.23).remainder(1).toNumber()).toBe(0.23)
  })
})
