import { effect } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
  it('test effect', () => {
    let li = reactive({
      age: 21,
    })
    let age
    effect(() => {
      console.log(li.age)
    })

    expect(li.age).toBe(21)

    li.age += 2
    expect(li.age).toBe(23)
  })
})
