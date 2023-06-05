import { describe, expect, it } from 'vitest';
import { useEmit } from '@/emit';
describe('test emit', () => {
   let { Emit, Handler } = useEmit();
   it('test emit handler', () => {
      class User {
         @Emit('user')
         name(...args: any[]) {
            console.log('hello');
            return args;
         }
      }
      let { user } = Handler('user', 1, 2, 3, 4, 5, 6);
      expect(user).toMatchInlineSnapshot(`
          [
            [
              [
                1,
                2,
                3,
                4,
                5,
                6,
              ],
            ],
          ]
        `);
   });
});
