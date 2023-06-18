import { usePipel } from '@/pipel';
import { expect, it, describe } from 'vitest';

describe('testing pipel', function () {
   it('testing pipel 1', () => {
      let [add, run] = usePipel();
      let double = (a: number) => {
         return a * 2;
      };
      let mult = (a: number) => {
         return a - 3;
      };
      add(double, mult);
      run(10).then(val => {
         expect(val).eq(17);
      });
   });
   it('testing pipel 2', () => {
      let [add, run, handler] = usePipel();
      let our = () => {
         throw Error('testing exepection');
      };
      handler((e, result) => {
         if (e) {
            console.log(e);
         }
      });
      add(our);
      run(1);
   });
});
