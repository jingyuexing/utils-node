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
