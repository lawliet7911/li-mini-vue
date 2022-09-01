let targetMap = new WeakMap()

let activeEffect: ReactiveEffect | null
let activeEffectStack: any[] = []

class ReactiveEffect {
  private _fn: Function
  deps: any[] = []
  constructor(fn: Function) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    cleanupEffect(this)
    activeEffectStack.push(this)
    let result = this._fn()
    activeEffect = activeEffectStack[activeEffectStack.length - 2]
    activeEffectStack.length > 1 && activeEffectStack.pop()
    return result
  }
}

export function effect(fn: Function) {
  let effect = new ReactiveEffect(fn)
  return effect.run()
}

function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((effect) => {})
  effect.deps.length = 0
}

export function track(target: object, key: PropertyKey) {
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap = targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  dep.add(activeEffect)
  activeEffect?.deps.push(activeEffect)
}

export function trigger(target: object, key: PropertyKey) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  let effects = depsMap.get(key)
  for (const effect of effects) {
    if (effect !== activeEffect) effect?.run()
  }
}
