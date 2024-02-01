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


function buildPartialMatchTable(pattern: string): number[] {
  const table: number[] = [];
  let i = 0;
  let j = 1;

  table[0] = 0; // 部分匹配表的第一个位置总是0

  while (j < pattern.length) {
    if (pattern[i] === pattern[j]) {
      // 当前字符匹配成功，下一个位置的部分匹配值为当前位置值加1
      table[j] = i + 1;
      i++;
      j++;
    } else {
      if (i !== 0) {
        // 当前字符匹配失败，回溯到上一个匹配位置进行继续匹配
        i = table[i - 1];
      } else {
        // i已经回溯到起始位置，当前字符匹配失败，继续下一个字符匹配
        table[j] = 0;
        j++;
      }
    }
  }

  return table;
}

function kmpSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const partialMatchTable = buildPartialMatchTable(pattern);
  let i = 0; // text中当前字符的索引
  let j = 0; // pattern中当前字符的索引

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      // 当前字符匹配成功，继续比较下一个字符
      i++;
      j++;

      if (j === pattern.length) {
        // 完全匹配，将匹配位置添加到结果中
        positions.push(i - j);
        j = partialMatchTable[j - 1];
      }
    } else {
      if (j !== 0) {
        // 当前字符匹配失败，回溯到上一个匹配位置进行继续匹配
        j = partialMatchTable[j - 1];
      } else {
        // j已经回溯到起始位置，当前字符匹配失败，继续下一个字符匹配
        i++;
      }
    }
  }

  return positions;
}

/**
 * [camelToKebab description]
 * @param  {string} camelStr [description]
 * @return {string}          [description]
 */
export function camelToKebab(camelStr: string): string {
    const result: string[] = [camelStr[0].toLowerCase()];
    for (let i = 1; i < camelStr.length; i++) {
        const char = camelStr[i];
        if (char.toUpperCase() === char) {
            result.push('-', char.toLowerCase());
        } else {
            result.push(char);
        }
    }
    return result.join('');
}
