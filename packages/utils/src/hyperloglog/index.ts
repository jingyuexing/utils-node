export class HyperLogLog {
  private registers: Uint8Array;
  private readonly log2m: number;
  private readonly alphaMM: number;

  constructor(log2m: number) {
    const m = 1 << log2m;
    this.registers = new Uint8Array(m);
    this.log2m = log2m;
    this.alphaMM = this.getAlphaMM(m);
  }

  private getAlphaMM(m: number): number {
    switch (m) {
      case 16:
        return 0.673 * m * m;
      case 32:
        return 0.697 * m * m;
      case 64:
        return 0.709 * m * m;
      default:
        return (0.7213 / (1 + 1.079 / m)) * m * m;
    }
  }

  private getHashValue(element: string): number {
    // 使用你喜欢的哈希函数生成哈希值
    // 这里使用了简单的字符串哈希函数
    let hash = 0;
    for (let i = 0; i < element.length; i++) {
      hash = (hash * 31 + element.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  }

  private getLeadingZeros(hash: number): number {
    // 计算哈希值二进制表示中前导零的数量
    let count = 1;
    while ((hash & 0x80000000) === 0) {
      count++;
      hash <<= 1;
    }
    return count;
  }

  private updateRegister(index: number, leadingZeros: number): void {
    // 更新寄存器的值为最大前导零数量
    this.registers[index] = Math.max(this.registers[index], leadingZeros);
  }

  add(element: string): void {
    const hash = this.getHashValue(element);
    const index = hash >>> (32 - this.log2m);
    const leadingZeros = this.getLeadingZeros(hash << this.log2m);

    this.updateRegister(index, leadingZeros);
  }

  count(): number {
    const m = 1 << this.log2m;
    let estimate = 0;
    let zeroes = 0;

    for (const register of this.registers) {
      if (register === 0) {
        zeroes++;
      }
      estimate += 1 / (1 << register);
    }

    let cardinality = this.alphaMM / estimate;

    if (cardinality <= 2.5 * m) {
      if (zeroes !== 0) {
        cardinality = m * Math.log(m / zeroes);
      }
    }

    return Math.round(cardinality);
  }
}
