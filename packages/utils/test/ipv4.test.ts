import { useIPv4 } from '@/IPv4';
import { describe, expect, it } from 'vitest';

describe('testing ipv4 case', () => {
   it('testing ipv4 toNumber', () => {
      let ip = useIPv4('127.0.0.1');
      expect(ip.toNumber()).eq(2130706433);
   });
   it('testing ipv4 toString', () => {
      let ip = useIPv4(2130706433);
      expect(ip.toString()).eq('127.0.0.1');
   });
   it('Ipv4 number test',()=>{
      let ip = useIPv4(133765820)
      expect(ip+"").eq("7.249.26.188")
   })
});
