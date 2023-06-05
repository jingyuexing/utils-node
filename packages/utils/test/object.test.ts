import { describe, expect, it } from 'vitest';

import { entries, Extends, exclude, renameKey } from '@/object';

describe('object testing', () => {
   it('test entries', () => {
      let obj: any[] = [12, 45, 'hello'];
      expect(entries(obj)).toMatchInlineSnapshot(`
        [
          [
            0,
            12,
          ],
          [
            1,
            45,
          ],
          [
            2,
            "hello",
          ],
        ]
      `);
      let map = new Map<string, any>();
      map.set('a', 1);
      map.set('b', 34);
      map.set('name', 36);

      expect(entries(map)).toMatchInlineSnapshot(`
        [
          [
            "a",
            1,
          ],
          [
            "b",
            34,
          ],
          [
            "name",
            36,
          ],
        ]
      `);
      expect(entries([12, 33, 56, 89])).toMatchInlineSnapshot(`
        [
          [
            0,
            12,
          ],
          [
            1,
            33,
          ],
          [
            2,
            56,
          ],
          [
            3,
            89,
          ],
        ]
      `);
      expect(
         entries({
            name: 'Typescript',
            type: 'Programing Language',
         }),
      ).toMatchInlineSnapshot(`
        [
          [
            "name",
            "Typescript",
          ],
          [
            "type",
            "Programing Language",
          ],
        ]
      `);
   });
   it('test exclude', () => {
      expect(
         exclude(
            {
               name: 'balabala',
               age: 33,
            },
            ['age'],
         ),
      ).toMatchInlineSnapshot(`
        {
          "name": "balabala",
        }
      `);
   });
   it('testing rename key', () => {
      expect(
         renameKey(
            {
               a: 'Bib',
               b: '1h',
            },
            {
               a: 'name',
               b: 'time',
            },
         ),
      ).toMatchInlineSnapshot(`
        {
          "name": "Bib",
          "time": "1h",
        }
      `);
   });
});
