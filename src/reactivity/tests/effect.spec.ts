import { effect } from '../effect'
import { reactive } from '../reactive'
// TDD test driven development
describe('effect', () => {
  it('test effect', () => {
    let li = reactive({
      age: 21,
    })
    let age

    expect(li.age).toBe(21)

    li.age += 2

    let result = effect(() => {
      return li.age + 1;
    })

    expect(result).toBe(24)

    expect(li.age).toBe(23)
  })
})
