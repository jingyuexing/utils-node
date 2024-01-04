export async function useStreamResponse(options: RequestInfo, callback: (content: string) => void) {
  const res = await fetch(options);
  let done = false;
  while (!done) {
    const reader = res.body?.getReader();
    const readStream = await reader?.read();
    const decoder = new TextDecoder();
    callback(decoder.decode(readStream?.value));
    done = readStream?.done || false;
  }
}
