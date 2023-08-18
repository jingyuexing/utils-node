type OneOfRule = `oneof=${string};`
type MaxOrMin = `${'max'|'min'}=${number|string};`
type GreatThan = `gt=${number};`
type GreatThanOrEqual = `gte=${number};`
type LessThan = `lt=${number};`
type LessThanOrEqual = `lte=${number};`

type ValidateObject<T> = {
    [K in keyof T]:`${OneOfRule | MaxOrMin|GreatThan|GreatThanOrEqual|LessThan|LessThanOrEqual}`
}

export function validate<T>(target:ValidateObject<T>):T{
    // use proxy object listen the setter or other way
    const error = ()=>{
    }
    return {} as T
}
