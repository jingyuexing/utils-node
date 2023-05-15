import { isArray,isMap,isObject } from "@/typeis"
export function exclude<T extends object>(obj: T, excludeName: (keyof T)[]) {
    let keys = Object.keys(obj) as unknown as (keyof T)[];
    let result: any = {}
    keys.forEach((key) => {
        if (!excludeName.includes(key)) {
            result[key] = obj[key]
        }
    })
    return result
}
export function renameKey<T extends object & {}>(obj:T,config:{[P in keyof T]:string}){
    let result = {}
    let configKeys = Object.keys(config)
    configKeys.forEach((key)=>{
        (result as any)[(config as any)[key] ] = (obj as any)[key]
    })
    let others = exclude(obj,configKeys as unknown as (keyof T)[])

    return {
        ...result,
        ...others
    }
}
export function entries<T extends any[] | Map<any,any>| Object & {}>(obj:T):Utils.Entries<T>{
    let entries_:([keyof T,any])[] = []
    if(isArray(obj)){
        obj.forEach((val,index)=>{
            entries_.push([index as Utils.Keyof<T>,val])
        })
    }else if(isMap(obj)){
        entries_ = [...obj.entries()] as [any,any][];

    }else if(isObject(obj)){
        Object.keys(obj).forEach((key)=>{
            entries_.push([key as Utils.Keyof<T>,(obj as any)[key]])
        })
    }
    return entries_ as Utils.Entries<T>;
}

export function Extends(target:any,obj:any){
    return Object.assign(target,Object.create(obj))
}
