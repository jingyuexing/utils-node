export class LRUCache<T> {
  capacity:number;
  map:Map<string,T> = new Map()
  constructor(capacity:number) {
    this.capacity = capacity;
  }
  get(key:string) {
    const value = this.map.get(key);
    if (value === undefined || value === null) {
      return -1;
    }
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  put(key:string, value:T) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}
