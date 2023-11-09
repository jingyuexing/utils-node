export function useBroadcastChannel<T>(channerlName: string) {
   const _bc = new BroadcastChannel(channerlName);
   let _message = (message: MessageEvent<T>) => {};
   let _error = (message: MessageEvent<T>) => {};
   const message = (callback: (message: MessageEvent<T>) => any) => {
      _message = callback;
   };
   const error = (callback: (message: MessageEvent<T>) => any) => {
      _error = callback;
   };
   _bc.addEventListener('message', _message);
   _bc.addEventListener('messageerror', _error);
   return {
      message,
      error,
   };
}
