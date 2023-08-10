import { Dict } from '../types';
import { isArray, isEmpty, isMap, isObject } from '../typeis';
// C=US\nST=CA\nL=SF\nO=Joyent\nOU=Node.js\nCN=ca1\nemailAddress=ry@clouds.org
export function parseCertString(cert: string): Dict<string, string> {
   const certObj = Object.create(null);
   const stringList = cert.split('\n');
   stringList.forEach(certValue => {
      if (certValue.indexOf('=') > 0) {
         const [key, value] = certValue.split('=');
         certObj[key] = value;
      }
   });
   return certObj;
}

/**
 * [export description]
 *
 * @param   {{url:string,data:Dict<string,number|string|boolean>|Map<string,number|string|boolean>}} config  the format config
 * @return  {string} result string
 */
export function format(config: {
   url: string;
   data: Dict<string, number | string | boolean> | Map<string, number | string | boolean>;
}): string;
/**
 * format string
 * @eample
 * ```js
 * format("/user/:uid",{
 *   uid:12
 * })
 * // will out put "/user/12"
 * // you can also use {}, like this "/user/{uid}"
 * fromat("/user/{uid}",{
 *  uid:12
 * }) // output "/user/12"
 * ```
 * @param {string} url the url string
 * @param {Dict<string, number | string | boolean>|Map<string,number|string|boolean>} data the format data
 * @return  {string}  the format result
 */
export function format(
   url: string,
   data: Dict<string, number | string | boolean> | Map<string, number | string | boolean>,
): string;
export function format(...args: any[]): string {
   const url: string =
      typeof args[0] === 'string' ? args[0] : toString.call(args[0]) === '[object Object]' ? args[0].url : '';
   const data: any = toString.call(args[0]) === '[object Object]' ? args[0].data : args[1];
   let urlBacks = url;
   if (isMap<string, number | string | boolean>(data)) {
      data.forEach(function (value, key) {
         urlBacks = (urlBacks as string).replace(`{${key}}`, `${value}`);
         urlBacks = (urlBacks as string).replace(`:${key}`, `${value}`);
      });
   } else if (isObject(data)) {
      Object.keys(data).forEach(function (key) {
         urlBacks = urlBacks.replace(`{${key}}`, `${(data as any)[key]}`);
         urlBacks = urlBacks.replace(`:${key}`, `${(data as any)[key]}`);
      });
   }
   return urlBacks;
}

export function AnyToString(val: any): string {
   let covertString = '';
   const objCache: any = {};
   if(isEmpty(val)){return covertString}
   if (isMap(val)) {
      val.forEach((value, key) => {
         objCache[key as string] = value;
      });
      covertString = JSON.stringify(objCache);
   } else if (isObject(val) || isArray(val)) {
      covertString = JSON.stringify(val);
   }  else {
      return `${val}`;
   }
   return covertString;
}

/**
 * [padEnd description]
 * @param {string} target [description]
 * @param {string} char   [description]
 * @param {number} num    [description]
 */
export function padEnd(target: string, char: string, num: number) {
   const back = target;
   const pading: string[] = [];
   if (target.length < num) {
      for (let i = 0; i < num - back.length; i++) {
         pading.push(char);
      }
      return back + pading.join('');
   }
   return back;
}
