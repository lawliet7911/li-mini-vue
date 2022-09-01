import { effect } from '../effect'
import { reactive } from '../reactive'
// TDD test driven development
describe('effect', () => {
  it('test effect', () => {
    let li = reactive({
      age: 21,
    })

    expect(li.age).toBe(21)

    let result = effect(() => {
      return ++li.age
    })
    let age = result();
    expect(age).toBe(23)

    expect(li.age).toBe(23)
  })
})

describe('effect schedular', () => {
  it('schedular', () => {
    let test2 = reactive({
      num: 1,
    })

    let run: any
    let tnum: number = 0
    let runner = effect(
      () => {
        tnum = test2.num
      },
      {
        schedular: () => {
          run = runner
        }, 
      }
    )
    expect(tnum).toBe(1)
    test2.num++
    run()
    expect(tnum).toBe(2)
  })
})
