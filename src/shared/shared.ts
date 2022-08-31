export const isObject = (value: any): boolean => {
  return typeof value == 'object' && value !== null
}

export const plainType = (target: any): string => {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

export const __IS_DEV__: boolean = true


export const warn:Function = __IS_DEV__ ? console.warn : ()=>{}

export const toPureString = (target:any) => {
  let type = plainType(target);
  let typeString = ['string','number'].includes(type)
  if(typeString) return type.toString();
  let typeRAWObject = ['object','array'].includes(type);
  if(typeRAWObject) return JSON.stringify(target)
}