class Bytes {
   constructor(
      private readonly bytes:number[]
   ) {
   }
   join(): number {
      let total = 0
      for(let i=0;i<this.bytes.length;i++) {
         total = (total << 8 )| this.bytes[i]
      }
      return total
   }
}
