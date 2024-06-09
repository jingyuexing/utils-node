import { fill } from "@/bitwise"

export class ABuffer<T extends number>{
   val:T[]
   constructor(length?:number){
      this.val = []
   }
   toString(){
      return this.val.map((val)=>val.toString(16)).join("")
   }
   normal(){

   }
   push(...items:T[]){

   }
   pop(){
      return this.val.pop()
   }
   indexOf(ele:T,index?:number){
      return this.val.indexOf(ele,index)
   }
   includes(ele:T,index?:number){
      return this.val.includes(ele,index)
   }
}

export function textoBuffer(text:string){
   if(typeof TextEncoder !== "undefined"){
      return new TextEncoder().encode(text)
   }
   let temp = []
   for(let i =0;i<text.length;i++){
      temp.push(...fill([],text.charCodeAt(i)))
   }
   const buffer = Uint8Array.from(temp)
   return buffer.buffer
}

export function bufferToText(buffer:ArrayBuffer,option?:TextDecoderOptions){
   if(typeof TextDecoder !== "undefined"){
      return new TextDecoder(undefined,option).decode(buffer)
   }
   return ""
}

export function fileToBuffer(chunks:Blob):Promise<ArrayBuffer>{
 return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", (ev) => {
      const result = ev.target?.result;
      if (result) {
        resolve(Buffer.from(result as ArrayBuffer));
      } else {
        reject(new Error("Failed to read file"));
      }
    });

    reader.addEventListener("error", (err) => {
      reject(err);
    });

    reader.readAsArrayBuffer(chunks);
  });
}
