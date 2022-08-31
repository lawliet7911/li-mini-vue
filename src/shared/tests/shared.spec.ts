import { isObject, plainType, toPureString } from '../index'
it('test shared', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
})

it('test plainType', () => {
  expect(plainType([])).toBe('array')
  expect(plainType(Symbol('iter'))).toBe('symbol')
  expect(plainType(1)).toBe('number')
  expect(plainType('1')).toBe('string')
  expect(plainType(null)).toBe('null')
  expect(plainType(undefined)).toBe('undefined')
})

it('test toPureString', () => {
  expect(toPureString([])).toBe('[]')
})