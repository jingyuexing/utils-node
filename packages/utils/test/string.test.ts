import { describe, expect, it } from 'vitest';
import { parseCertString, format, AnyToString } from '@/string';
describe('parse module testing case', () => {
   it('test cert string', () => {
      let cert = parseCertString(
         'C=US\nST=CA\nL=SF\nO=Joyent\nOU=Node.js\nCN=ca1\nemailAddress=ry@clouds.org',
      );
      expect(cert['C']).eq('US');
      expect(cert['ST']).eq('CA');
      expect(cert['emailAddress']).eq('ry@clouds.org');
      console.log(cert);
   });
   it('test format', () => {
      let map = new Map<string, string | number | boolean>();
      map.set('name', 'Jim');
      map.set('uid', 13998026);
      expect(
         format('/user/:uid', {
            uid: 4399,
         }),
      ).eq('/user/4399');
      expect(
         format('/user/{uid}', {
            uid: 4399,
         }),
      ).eq('/user/4399');
      expect(
         format('/user/{name}/{uid}', {
            uid: 4399,
            name: 'v',
         }),
      ).eq('/user/v/4399');
      expect(format('/user/{name}/{uid}', map)).eq('/user/Jim/13998026');
   });
   it('testing anyToString', () => {
      let map = new Map<string, any>();
      map.set('a', 'gf');
      map.set('aw1', 12);
      map.set('aw', {});
      expect(AnyToString('')).eq('');
      expect(AnyToString({})).eq('');
      expect(AnyToString([])).eq('');
      expect(AnyToString(map)).eq(`{"a":"gf","aw1":12,"aw":{}}`);
      expect(AnyToString({ name: 'TypeScript' })).eq('{"name":"TypeScript"}');
      expect(AnyToString([1, 2, 3, 4, 5, 6, 7, 7, 8])).eq('[1,2,3,4,5,6,7,7,8]');
      expect(AnyToString(12)).eq('12');
      expect(AnyToString(889)).eq('889');
   });
});
