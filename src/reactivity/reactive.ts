import { isObject } from '../shared'
import { track, trigger } from './effect'
const proxyMap = new WeakMap()

function isReactive(target: any): boolean {
  return target.hasOwnProperty('_raw')
}

const baseHandler = {
  get(target: object, key: PropertyKey, receiver: object) {
    track(target, key)
    let data = Reflect.get(target, key, receiver)
    let o =  !isObject(data) ? data : isReactive(data) ? data : reactive(data)
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
  let proxy:any = new Proxy(target, baseHandler)
  proxy._raw = target
  return proxy 
}

export function reactive(target: object) {
  let proxyTarget = proxyMap.get(target)
  if (!proxyTarget) {
    proxyTarget = createReactiveObject(target)
    proxyMap.set(target, proxyTarget)
  }
  console.log('12313112312')
  return proxyTarget
}
