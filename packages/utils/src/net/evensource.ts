import { isUndefined } from "../typeis";

export function useSSE(url: string, options: {
   onMessage?: (e: MessageEvent) => void;
   onError?: (e: any) => void;
   onOpen?: (e: Event) => void;
} = {}
) {
   useEventSource(url,options)
}

export function useEventSource(
   url: string,
   options: {
      onMessage?: (e: MessageEvent) => void;
      onError?: (e: any) => void;
      onOpen?: (e: Event) => void;
   } = {},
) {
   const { onMessage, onError, onOpen } = options;

   if (isUndefined(EventSource)) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
               if (onMessage) {
                  onMessage({ data: xhr.responseText } as MessageEvent);
               }
            } else {
               if (onError) {
                  onError({
                     status: xhr.status,
                     message: xhr.statusText,
                     data: xhr.responseText,
                  });
               }
            }
         }
      };
      xhr.onerror = (event) => {
         if (onError) {
            onError({
               status: xhr.status,
               message: xhr.statusText,
               data: xhr.responseText,
            });
         }
      };
      xhr.send();
   } else {
      const es = new EventSource(url);
      if (onMessage) {
         es.onmessage = onMessage;
      }
      if (onError) {
         es.onerror = onError;
      }
      if (onOpen) {
         es.onopen = onOpen;
      }
   }
}
