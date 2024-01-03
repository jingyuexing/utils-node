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
  const mask = (1 << (byteCount * 8)) - 1;
  return value & mask;
}
export function getLowestBits(value: number, bitCount: number): number {
  const mask = (1 << bitCount) - 1;
  return value & mask;
}

export function getHighestBytes(value: number, byteCount: number) {
  const shift = (4 - byteCount) * 8;
  const mask = (1 << (byteCount * 8)) - 1;
  return (value & mask) >>> shift;
}

export function getHighestBits(value: number, bitCount: number): number {
  const shift = countBits(value) - bitCount;
  const mask = (1 << bitCount) - 1;
  return (value >> shift) & mask;
}

/**
 * count a number bit length
 * @param  {number} num need count num
 * @return {number}     the bit length
 */
function countBits(num: number): number {
  let count = 0;
  while (num !== 0) {
    count++;
    num >>= 1;
  }
  return count;
}
export { countBits };

/**
 * generator a random number
 * @param {number} min the min value
 * @param {number} max the max value
 */
export function randomRange(min:number,max:number) {
   return Math.random() * (max - min) + min
}

/**
 * generator a random integer number
 * @param {number} min the min value
 * @param {number} max the max value
 */
export function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
