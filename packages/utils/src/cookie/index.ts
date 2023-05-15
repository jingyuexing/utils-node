
export function useCookies(cookies: string = document.cookie) {
   let cookiesDict = new Cookies(cookies)
   function cookie() {
      return {
         get(key: string) {
            return cookiesDict.getOne(key)
         },
         set(key: string, value: string) {
            cookiesDict.setValue(key, value);
         },
         toString() {
            return cookiesDict.toString()
         }
      }
   }
   return cookie()
}

export class Cookies {
   cookies: Utils.Dict<string, string>;
   constructor(cookies: string) {
      this.cookies = this.parse(cookies)
   }
   parse(cookieString: string) {
      let cookieDict: Utils.Dict<string, string> = {};
      cookieString = cookieString.replace(/\s/g, "")
      for (let cookie of cookieString.split(";")) {
         cookie = cookie.trim()
         let [key, val] = cookie.split("=");
         cookieDict[key] = val
      }
      return cookieDict;
   }
   toString() {
      let cookieString: string[] = []
      Object.keys(this.cookies).forEach((key) => {
         cookieString.push(`${key}=${this.cookies[key]}`)
      })
      return cookieString.join(";")
   }
   setValue(key: string, value: string) {
      this.cookies[key] = value
   }
   getOne(key: string) {
      return this.cookies[key];
   }
   getAll() {
      return this.cookies
   }
}
