import { useQuery, useDocQuery } from '@/index';
import { describe, expect, it } from 'vitest';

describe('test query parse', () => {
   let query = useQuery('name=23&bx=dfgdwer&keyword=忠诚');
   it('test query get', () => {
      expect(query.get('keyword')).eq('忠诚');
      console.log(query + '');
   });
   it('test query set', () => {
      query.set('name', 'bigbrother');
      expect(query.get('name')).eq('bigbrother');
      console.log(query + '');
   });
   it('test string', () => {
      expect(query + '').eq('name=bigbrother&bx=dfgdwer&keyword=忠诚');
      expect(`${query}`).eq('name=bigbrother&bx=dfgdwer&keyword=忠诚');
   });
   it('test document full url query', () => {
      let query = useDocQuery('https://www.example.com?name=23,23,23&ok=true&lang=34');
      expect(query['ok']).eq('true');
      expect(query['lang']).eq('34');
   });
});
