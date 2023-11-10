import { useCookies } from '@/cookie';
import { describe, expect, it } from 'vitest';

describe('cookies test', () => {
   const cookies = useCookies(
      `des_opt_in=Y; g_state={"i_p":1677673905074,"i_l":1}; ct0=15adce9490d79b2d7e6501af3dad459645051ff89dc32b23b06e417652222569c083b9a6ce9b9075ba4a8df5ee645c1d6d3b1c796af68014fd6c57b615ae021b7257b817dcb053cfede9678ed379cfe1; lang=zh-cn`,
   );
   it('test cookie get key', () => {
      expect(cookies.get('des_opt_in')).eq('Y');
      expect(cookies.get('ct0')).eq(
         '15adce9490d79b2d7e6501af3dad459645051ff89dc32b23b06e417652222569c083b9a6ce9b9075ba4a8df5ee645c1d6d3b1c796af68014fd6c57b615ae021b7257b817dcb053cfede9678ed379cfe1',
      );
   });
   it('test cookie set key', () => {
      cookies.set('des_opt_in', 'N');
      expect(cookies.get('des_opt_in')).eq('N');
   });
   it('test cookies string', () => {
      expect(`${cookies}`).toMatchInlineSnapshot('"des_opt_in=N;g_state={\\"i_p\\":1677673905074,\\"i_l\\":1};ct0=15adce9490d79b2d7e6501af3dad459645051ff89dc32b23b06e417652222569c083b9a6ce9b9075ba4a8df5ee645c1d6d3b1c796af68014fd6c57b615ae021b7257b817dcb053cfede9678ed379cfe1;lang=zh-cn"');
   });
   it('test cookie getall', () => {
      expect(cookies.all()).toMatchInlineSnapshot(`
        {
          "ct0": "15adce9490d79b2d7e6501af3dad459645051ff89dc32b23b06e417652222569c083b9a6ce9b9075ba4a8df5ee645c1d6d3b1c796af68014fd6c57b615ae021b7257b817dcb053cfede9678ed379cfe1",
          "des_opt_in": "N",
          "g_state": "{\\"i_p\\":1677673905074,\\"i_l\\":1}",
          "lang": "zh-cn",
        }
      `);
   });
});
