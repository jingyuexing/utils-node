namespace Requests {
   export type Dict<K extends string | number | symbol, V> = {
      [P in K]: V
   }
   export type Union<T extends unknown[]> = T[number];

   export type Literal<T extends number[] | string[] | symbol[]> = T[number];

   export type RequestOptions = {
      url:string,
      method?:Literal<["POST","GET","OPTIONS","PUT","DELETE","PATCH"]>
      query?:Dict<string,any>
      // Request body
      body?:Dict<string,any>
      // this is Oauth token
      auth?:string

      type?:Literal<["json","form"]>,

      cookies?:Union<[string,Dict<string,any>]>,

      headers?:Dict<string,string>
   }
}
