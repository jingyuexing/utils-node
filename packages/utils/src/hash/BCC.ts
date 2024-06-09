import { stringToNumber } from "@jingyuexing/utils"

export function BCC(text:string){
    let buffer = new TextEncoder().encode(text)
    let inital = buffer[0]
    for(let i =1;i<buffer.length;i++){
        inital ^= buffer[i]
    }
    return inital
}
export function HexToBuffer(hex:string){
    let parts = hex.split(" ")
    let buffer = new Uint8Array(parts.length)
    for(let i=0;i<parts.length;i++){
        buffer[i] = stringToNumber(parts[i],16)
    }
    return buffer
}