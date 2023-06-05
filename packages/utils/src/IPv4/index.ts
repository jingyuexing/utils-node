import { isNumber, isString } from '@/typeis';

export class IPv4 {
   ipv4: string = '';
   integer: number = 0;

   constructor(ip: string | number) {
      if (isString(ip)) {
         this.ipv4 = ip;
      } else if (isNumber(ip)) {
         this.integer = ip;
      }
   }
   /**
    * [_toString description]
    * @param {number} ip [description]
    */
   _toString(ip: number) {
      return `${(ip >> 24) & 0xff}.${(ip >> 16) & 0xff}.${(ip >> 8) & 0xff}.${(ip >> 0) & 0xff}`;
   }
   /**
    * [_toNumber description]
    * @param {string = ""} address [description]
    */
   _toNumber(address: string = '') {
      if (address != '') {
         let ipNumber = 0;
         let partIp = address.split('.');
         let i = 0;
         for (let ipart of partIp) {
            ipNumber += parseInt(ipart) * 0x100 ** (3 - i);
            i++;
         }
         return ipNumber;
      }
   }
   toString() {
      return this._toString(this.integer);
   }
   toNumber() {
      return this._toNumber(this.ipv4);
   }
   /**
    * @param {string} start start condition of the iterator
    * @param {string} end start condition of the iterator
    *
    * @example
    * ```js
    * for(let ip of generator("127.0.0.1","192.168.255.255")){
    *    console.log(ip)
    * }
    * ```
    */
   *generator(start: string = '', end: string = '') {
      if (start != '' && end != '') {
         let next = this._toNumber(start) as number;
         let final = this._toNumber(end) as number;
         if (start < end) {
            while (next < final) {
               yield this._toString(next);
               next++;
            }
         }
      }
   }
}

export function useIPv4(ip: string | number) {
   let ip_ = new IPv4(ip);
   return ip_;
}
