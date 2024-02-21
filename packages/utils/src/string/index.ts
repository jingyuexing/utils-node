import { Dict } from '../types';
import { isArray, isEmpty, isMap, isObject } from '../typeis';
import { nestedObject } from '../object';
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
   if (isEmpty(val)) { return covertString }
   if (isMap(val)) {
      val.forEach((value, key) => {
         objCache[key as string] = value;
      });
      covertString = JSON.stringify(objCache);
   } else if (isObject(val) || isArray(val)) {
      covertString = JSON.stringify(val);
   } else {
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

function isInRange(char:string,range:[begin:number,end:number]){
   let [begin,end] = range;
   for (let i = 0; i < char.length; i++) {
      if (!(begin <= char.charCodeAt(i) && char.charCodeAt(i) <= end)) {
         return false
      }
   }
   return true
}


export function isNumberic(char: string) {
   return isInRange(char,[48,57])
}

export function isUpper(char: string) {
   return isInRange(char,[65,90])
}

export function isLower(char: string) {
   return isInRange(char,[97,122])
}

export function isAlphabet(char: string) {
   return isUpper(char) || isLower(char)
}

export function isAlphanum(char: string) {
   return isAlphabet(char) || isNumberic(char)
}
/**
 * [string description]
 * @type {[type]}
 */
export function referenceString<T extends Record<string, string>, S extends string>(
   target: T,
   refrenceSymbol: S = "@" as S
): [{ readonly [K in keyof T]: T[K] }, (text: string) => string] {

   const getAlphabet = (text: string, delimiter: string[] = [".", "/"]) => {
      let word: string[] = []
      for (let char of text) {
         if (char !== refrenceSymbol && char.trim() !== "") {
            if (isAlphanum(char) || delimiter.includes(char)) {
               word.push(char)
            } else if (char.charCodeAt(0) > 0xff) {
               word.push(char)
            }
         }
      }
      return word.join("")
   }
   const replaceSymbol = (text: string, symol: `${typeof refrenceSymbol}${keyof T & string}`, value: string) => {
      let text_ = text
      while (text_.includes(symol)) {
         text_ = text_.replace(symol, value)
      }
      return text_
   }

   const deepReplace = (text: string) => {
      let textClone = text;
      let rawList = textClone.split(" ")
      for (let i = 0; i < rawList.length; i++) {
         var token = rawList[i];
         if (!textClone.includes(refrenceSymbol)) {
            break
         }
         if (token.includes(refrenceSymbol)) {
            let refrence = token
               .split(refrenceSymbol)
               .filter((val) => val !== "")
            refrence.forEach((ref) => {
               let validRef = getAlphabet(ref)
               let values = deepReplace(nestedObject(target, validRef))
               textClone = replaceSymbol(textClone, `${refrenceSymbol}${validRef as T & string}`, values)
            })
         }
      }
      return textClone;
   }
   const replaceReference = (attribute: keyof T) => {
      let rawstring = target[attribute]
      return deepReplace(rawstring)
   }

   const values = Object.create(null)
   Object.keys(target).forEach((keys) => {
      Object.defineProperty(values, keys, {
         get() {
            return replaceReference(keys)
         }
      })
   })
   let parser = (text: string): string => {
      return deepReplace(text)
   }
   return [values as unknown as { [K in keyof T]: T[K] }, parser]
}

export function findVariableNames(text: string, formatSymbol: string = "{}") {
   let leftSymbol = "";
   let rightSymbol = "";
   if ((formatSymbol.length & 1) == 0) {
      leftSymbol = formatSymbol[0]
      rightSymbol = formatSymbol[1]
   } else {
      leftSymbol = formatSymbol[0]
   }
   let variableNames: string[] = []
   let idx = 0;
   while (idx < text.length) {
      let variableName: string[] = []
      if(!text.slice(idx).includes(rightSymbol)){
         break
      }
      if (text[idx] == leftSymbol) {
         let n = idx + 1
         while (n < text.length) {
            if (rightSymbol !== "" && text[n] == rightSymbol) {
               break
            } else if (text[n] === " " || !isAlphanum(text[n])) {
               break
            }
            variableName.push(text[n])
            n++;
         }
         variableNames.push(variableName.join(""))
         variableName = []
         idx = n;
      }
      idx++
   }
   return variableNames;
}
