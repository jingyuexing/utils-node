/**
 * [manhattanDistance description]
 * @param {number[]} pointA [description]
 * @param {number[]} pointB [description]
 */
export function manhattanDistance(pointA: number[], pointB: number[]) {
  let distance = 0;
  if (pointA.length !== pointB.length) {
    return -1;
  }
  for (let i = 0; i < pointA.length; i++) {
    distance += Math.abs(pointA[i] - pointB[i]);
  }
  return distance;
}

export function isOdd(n: number) {
  return (n & 1) === 1;
}

export function isEvent(n: number) {
  return !isOdd(n);
}

export function getLowestBytes(value: number, byteCount: number): number {
  const mask = (1 << (byteCount * 8)) - 1; // 创建一个掩码，用于提取指定字节数的低位
  return value & mask; // 使用位与操作符与掩码进行按位与运算，提取低位字节
}
export function getLowestBits(value: number, bitCount: number): number {
  const mask = (1 << bitCount) - 1; // 创建一个掩码，用于提取指定位数的低位
  return value & mask; // 使用位与操作符与掩码进行按位与运算，提取低位比特
}

export function getHighestBytes(value: number, byteCount: number) {
  const shift = (4 - byteCount) * 8; // 计算向右移动的位数
  const mask = (1 << (byteCount * 8)) - 1; // 创建一个掩码，用于提取指定字节数的高位
  return (value & mask) >>> shift; // 使用位与操作符与掩码进行按位与运算，然后使用无符号右移运算符进行向右移动，提取高位字节
}

export function getHighestBits(value: number, bitCount: number): number {
  const shift = countBits(value) - bitCount; // 计算向右移动的位数
  const mask = (1 << bitCount) - 1; // 创建一个掩码，用于提取指定位数的高位
  return (value >> shift) & mask; // 向右移动并使用位与操作符与掩码进行按位与运算，提取高位
}

function countBits(num: number): number {
  let count = 0;
  while (num !== 0) {
    count++;
    num >>= 1;
  }
  return count;
}
export { countBits };


export function randomRange(min:number,max:number) {
   return Math.random() * (max - min) + min
}

export function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
