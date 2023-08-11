import { isNone } from '../typeis'
export function Some<T>(val:T){
    let _val = val
    let _msg = ''
    const some_ = {
        expect(msg){
            _msg = msg
            return some_
        },
        unwrap(){
            if(isNone(_val)){
                throw Error(_msg)
            }
            return _val
        }
    }
    return some_;
}