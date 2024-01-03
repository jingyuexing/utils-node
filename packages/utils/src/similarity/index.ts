export function hammingDistance(a: number, b: number) {
   let c = a ^ b; // 取出不同的位
   let distance = 0;
   while (c) {
      distance += 1;
      c = c & (c - 1);
   }
   return distance;
}

export function significantBits(a: number) {
   let bits = 0;
   while (a) {
      a = a >> 1;
      bits++;
   }
   return bits;
}

export function simlar(a: number, b: number) {
   let same =  0
   while(a && b) {
      if(((a & 1) & (b & 1)) === 1){
         same ++
      }
      a >>= 1;
      b >>= 1;
   }
   return same
}
