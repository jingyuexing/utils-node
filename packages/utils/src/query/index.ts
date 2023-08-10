import { Dict } from "../types";

/**
 * Parse document query parameters
 * @param {string = document.location.href} query the document link
 */
export function useQuery(query: string = document.location.href) {
   const queryMap = new Map<string, string>();
   function parse() {
      for (const queryPair of query.split('&')) {
         const [key, value] = queryPair.split('=');
         queryMap.set(key, value);
      }
   }
   parse();
   return (() => {
      return {
         get(key: string) {
            return queryMap.get(key);
         },
         set(key: string, val: string) {
            queryMap.set(key, val);
            return this.get(key);
         },
         toString() {
            const querystring: string[] = [];
            queryMap.forEach((val: string, key: string) => {
               querystring.push(`${key}=${val}`);
            });
            return querystring.join('&');
         },
      };
   })();
}

export function useDocQuery(url: string): Dict<string, string> {
   const queryObject: Dict<string, string> = {};
   if (globalThis.window !== undefined && globalThis.document !== undefined) {
      url = document.location.href;
   }
   const [host, query] = url.split('?');
   if (query) {
      query.split('&').forEach(val => {
         const [key, value] = val.split('=');
         queryObject[key] = value;
      });
   }
   return queryObject;
}
