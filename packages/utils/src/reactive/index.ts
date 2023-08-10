import { isUndefined } from "../typeis";

export function reactive<T extends object & {}>(obj: T) {
  let _getter: <S>(target: T, key: string | symbol) => S
  let _setter: <S>(target: T, key: string | symbol, value: any) => S
  let _reactiveObject: T | {} = {};
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      if (!isUndefined(_getter)) {
        _getter(target, key)
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (!isUndefined(_setter)) {
        _setter(target, key, value)
      }
      return Reflect.set(target, key, value, receiver);
    },
  };
  if (typeof Proxy !== "undefined") {
    _reactiveObject = new Proxy(obj, handler);
  } else {
    for (const key in obj) {
      Object.defineProperty(obj, key, {
        get() {
          if (!isUndefined(_getter)) {
            _getter(obj, key)
          }
          return obj[key];
        },
        set(value) {
          if (!isUndefined(_setter)) {
            _setter(obj, key, value)
          }
          obj[key] = value;
        },
      });
    }
    _reactiveObject = obj;
  }
  const getter = (cb: (<S>(target: T, key: keyof T | string | symbol) => S)) => {
    _getter = cb
  }
  const setter = (cb: <S>(target: T, key: keyof T | string | symbol, value: any) => S) => {
    _setter = cb
  }
  return {
    values: _reactiveObject,
    getter,
    setter
  }
}

const { getter,setter,values } = reactive({
  name:"",
  age:""
})

