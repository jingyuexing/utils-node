import { describe, it, expect } from 'vitest';
import { chain } from '../src/chian';

describe('testing case chain', () => {
   const { next, invoke, onError } = chain();
   it('case 1', () => {
      let s = 1;
      next(() => {
         console.log('S is:', s);
         s++;
         console.log('S is:', s);
      });
      next(() => {
         s++;
         console.log('S is:', s);
      });
      next(() => {
         s++;
         console.log('S is:', s);
      })
      invoke();
   });
});
