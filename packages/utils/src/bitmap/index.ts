export class Bitmap {
  #size: number;
  #bitmap: Uint8Array;

  constructor(size: number) {
    this.#size = size;
    const numWords = Math.ceil(size / 8);
    this.#bitmap = new Uint8Array(numWords);
  }

  setBit(num: number): void {
    if (num < 0 || num >= this.#size) {
      throw new Error("Index out of range");
    }
    const wordIndex = Math.floor(num / 8);
    const bitIndex = num % 8;
    this.#bitmap[wordIndex] |= 1 << bitIndex;
  }

  getBit(num: number): boolean {
    if (num < 0 || num >= this.#size) {
      throw new Error("Index out of range");
    }
    const wordIndex = Math.floor(num / 8);
    const bitIndex = num % 8;
    return (this.#bitmap[wordIndex] & (1 << bitIndex)) !== 0;
  }
  count(): number {
    let count = 0;
    for (let i = 0; i < this.#bitmap.length; i++) {
      let byte = this.#bitmap[i];
      while (byte !== 0) {
        count += byte & 1;
        byte >>= 1;
      }
    }
    return count;
  }
}

