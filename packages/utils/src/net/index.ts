import { isUndefined } from "../typeis";

export function useSocket(socketURL: `${"ws" | "wss"}://${string}:${number}`) {
   const ws = new WebSocket(socketURL);
   let _data: any;
   let _onMeesage: (e: MessageEvent) => void;
   ws.addEventListener("message", (event) => {
      if (!isUndefined(_onMeesage)) {
         _onMeesage.call(ws, event);
      }
      _data = event.data;
   })
   const onOpen = (cb: (e: Event) => void) => {
      ws.onopen = cb
   }
   const onMessage = (cb: (e: MessageEvent) => void) => {
      _onMeesage = cb;
   }
   const onClose = (cb: (e: CloseEvent) => void) => {
      ws.onclose = cb
   }
   const onError = (cb: (event: Event) => void) => {
      ws.onerror = cb
   }
   const exit = () => {
      ws.close();
   }
   return {
      onClose,
      onOpen,
      onError,
      exit,
      onMessage,
      data: _data
   }
}
