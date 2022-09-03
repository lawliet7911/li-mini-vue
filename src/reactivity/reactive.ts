import { isObject } from '../shared'
import { track, trigger } from './effect'
const proxyMap = new WeakMap()

const baseHandler = {
  get(target: object, key: PropertyKey, receiver: object) {
    track(target, key)
    let data = Reflect.get(target, key, receiver)
    let o = !isObject(data) ? data : reactive(data)
    // console.log(o)
    return o
  },
  set(target: object, key: PropertyKey, value: any, receiver: object) {
    let result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  },
}

function createReactiveObject(target: object, isShallow: boolean = false, isReadonly: boolean = false) {
  let existProxy: any = proxyMap.get(target)
  if (!existProxy) {
    existProxy = new Proxy(target, baseHandler)
    // existProxy._raw = target
    proxyMap.set(target, existProxy)
  }
  return existProxy
}

export function reactive(target: object) {
  let reactiveObj = createReactiveObject(target)
  return reactiveObj
}
