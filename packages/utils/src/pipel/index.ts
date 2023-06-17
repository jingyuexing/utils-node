export function usePipel<T>(): [(...callbacks: Function[]) => void, <T>(input:T) => Promise<T>,(handler:(e:Error,result:any)=>void)=>void] {
   let funcList: Function[] = [];
   let errorHandler: Function | null = null;
   let run = async <T>(input:T): Promise<T> => {
      let result: T = input;
      for (let i = 0; i < funcList.length; i++) {
         try {
            result = await funcList[i](result);
         } catch (e) {
            if (errorHandler) {
               result = await errorHandler(e, result);
            } else {
               throw e;
            }
         }
      }
      return result;
   };
   let add = (...callbacks: Function[]) => {
      for (let i = 0; i < callbacks.length; i++) {
         funcList.push(callbacks[i]);
      }
   };
   let setErrorHandler = (handler:(e:Error,result:any)=>void)=>{
      errorHandler = handler
   }
   return [add, run,setErrorHandler];
}
