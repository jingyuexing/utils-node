export function chunk<T extends unknown[] | string>(data: T, size: number): T[] {
  const result: T[] = [];
  const _data: string[] | unknown[] = typeof data === "string" ? data.split("") : Array.isArray(data) ? data : [];
  for (let i = 0; i < _data.length; i += size) {
    let chunk = _data.slice(i, Math.min(i + size, length)) as T;
    if (typeof data === "string") {
      chunk = (chunk as string[]).join("") as T;
    }
    result.push(chunk);
  }
  return result;
}
