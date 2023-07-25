import { describe, expect, it } from 'vitest';
import { useEmit } from '../src/emit';
describe('test emit', () => {
   const { Emit, Handler } = useEmit();
   it('test emit handler', () => {
      class User {
         @Emit('user')
         name(...args: any[]) {
            console.log('hello');
            return args;
         }
      }
      const { user } = Handler('user', 1, 2, 3, 4, 5, 6);
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
