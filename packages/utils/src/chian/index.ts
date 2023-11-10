interface IChain {
   cllback: (...args: any[]) => void;
   next: Chain | null;
}

class Chain implements IChain {
   next: Chain | null;
   cllback: (...args: any[]) => void;
   constructor(callback: (...args: any[]) => void) {
      this.cllback = callback;
      this.next = null;
   }
}

export function chain() {
   let position: Chain | null = null;
   let root: Chain | null = null;
   let errorCallback: (e: Error) => void;
   const makeChain = (callback: (...args: any[]) => void) => {
      return new Chain(callback);
   };
   const next = (callback: (...args: any[]) => void) => {
      if (!position) {
         root = position = makeChain(callback);
      } else {
         position.next = makeChain(callback);
         position = position.next;
      }
   };
   const onError = (callback: (e: Error) => void) => {
      errorCallback = callback;
   };
   const invoke = async () => {
      let current:Chain|null = root;
      while (current) {
         try {
            await new Promise(()=>{
               current?.cllback.call(null)
            });
         } catch (error) {
            if(errorCallback){
               errorCallback(error as Error);
            }else{
               throw error
            }
         }
         current = current.next
      }
   };
   return {
      next,
      invoke,
      onError,
   };
}
