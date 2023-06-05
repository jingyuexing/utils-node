export function useQuery(query: string = document.location.href) {
   let queryMap = new Map<string, string>();
   function parse() {
      for (let queryPair of query.split('&')) {
         let [key, value] = queryPair.split('=');
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
            let querystring: string[] = [];
            queryMap.forEach((val: string, key: string) => {
               querystring.push(`${key}=${val}`);
            });
            return querystring.join('&');
         },
      };
   })();
}

export function useDocQuery(url: string): Utils.Dict<string, string> {
   let queryObject: Utils.Dict<string, string> = {};
   if (globalThis.window !== undefined && globalThis.document !== undefined) {
      url = document.location.href;
   }
   let [host, query] = url.split('?');
   if (query) {
      query.split('&').forEach(val => {
         let [key, value] = val.split('=');
         queryObject[key] = value;
      });
   }
   return queryObject;
}
