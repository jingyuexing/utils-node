import { usePipel } from '@/pipel';
import { expect, it, describe } from 'vitest';

describe('testing piple', function () {
   let [add,run] = usePipel()
   it('testing piple 1', () => {
      let double = (a: number) => {
         return a * 2;
      };
      let mult = (a: number) => {
         return a - 3;
      };
      add(double,mult)
      run(10).then((val)=>{
         expect(val).eq(17)
      })
   });
});
