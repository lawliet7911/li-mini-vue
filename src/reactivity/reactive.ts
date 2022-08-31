import { track, trigger } from './effect'
const proxyMap = new WeakMap()

const baseHandler = {
  get(target: object, key: PropertyKey, receiver: object) {
    track(target, key)
    return Reflect.get(target, key, receiver)
  },
  set(target: object, key: PropertyKey, value: any, receiver: object) {
    let result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  },
}

export function reactive(target: object) {
  let proxyTarget = proxyMap.get(target)
  if (!proxyTarget) {
    proxyTarget = new Proxy(target, baseHandler)
    proxyMap.set(target, proxyTarget)
  }
  return proxyTarget
}
