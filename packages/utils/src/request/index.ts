function useEventSource(
   url: string,
   callback: (((ev: Event) => void) | undefined)[],
   options?: EventSourceInit,
) {
   let eventsource = new EventSource(url, options);
   let [message, open, error] = callback;
   eventsource.onerror = error || function () {};
   eventsource.onmessage = message || function () {};
   eventsource.onopen = open || function () {};
}
