import { isNone } from '../typeis'
export function Some<T>(val:T){
    let _val = val
    let _msg = 'this value is not valid type'
    const some_ = {
        expect(msg = 'this value is not valid type'){
            _msg = msg
            return some_
        },
        unwrap(): T extends undefined ? 'None' : T extends null ? 'None' : T {
            if(isNone(_val)){
                console.error(_msg)
                return 'None'
            }
            return _val
        },
        toString(){
            if(isNone(_val)){
                return 'None'
            }
            return `${_val}`
        }
    }
    return some_;
}

Some(undefined).unwrap()