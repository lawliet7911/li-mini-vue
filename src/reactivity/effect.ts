let targetMap = new WeakMap()

let activeEffect: ReactiveEffect | null
// let activeEffectStack: any[] = []

class ReactiveEffect {
  private _fn: Function
  deps: any[] = []
  constructor(fn: Function, public schedular?: Function) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    // cleanupEffect(this)
    // activeEffectStack.push(this)
    let result = this._fn()
    // activeEffect = activeEffectStack[activeEffectStack.length - 2]
    // activeEffectStack.length > 1 && activeEffectStack.pop()
    return result
  }
  stop() {
    cleanupEffect(this)
  }
}

export function effect(fn: Function, options: any = {}) {
  let effect = new ReactiveEffect(fn, options.schedular)
  effect.run()
  let runner = effect.run.bind(effect)
  return runner
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect) // 删除当前依赖
  })
}

export function track(target: object, key: PropertyKey) {
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap = targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  if (!activeEffect) return

  dep.add(activeEffect)
  activeEffect?.deps.push(dep)
}

export function trigger(target: object, key: PropertyKey) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  let effects = depsMap.get(key)
  for (const effect of effects) {
    if (effect?.schedular) {
      effect.schedular()
    } else if (effect !== activeEffect) {
      effect?.run()
    }
  }
}

export function stop(runner: any) {
  runner.effect.stop()
}
