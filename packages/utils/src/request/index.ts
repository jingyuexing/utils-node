import { isEmpty } from "../typeis";

function useEventSource(
   url: string,
   callback: (((ev: Event) => void) | undefined)[],
   options?: EventSourceInit,
) {
   const eventsource = new EventSource(url, options);
   const [message, open, error] = callback;
   eventsource.onerror = error ||  null;
   eventsource.onmessage = message || null;
   eventsource.onopen = open || null;
}

type FetchInit = {}

export function useFetch(url: string, options?: FetchInit) {
   if(url !== "" && isEmpty(options)){

   }
}

export function useXHR(url: string, options?: RequestInit) {
   const xhr = new XMLHttpRequest()
   xhr.open(options?.method || "GET", url, true);
   xhr.send({

   } as XMLHttpRequestBodyInit);
   xhr.onabort
}
