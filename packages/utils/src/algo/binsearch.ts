function binarySearch<T>(
  target: T,
  arr: T[],
  compareFn: (a: T, b: T) => number
): number {
  let low = 0;
  let high: number = arr.length - 1;

  while (low <= high) {
    const mid: number = Math.floor((low + high) / 2);
    const midValue: T = arr[mid];

    const comparison: number = compareFn(midValue, target);

    if (comparison === 0) {
      return mid; // 找到了目标值，返回索引
    } else if (comparison < 0) {
      low = mid + 1; // 目标值在右侧
    } else {
      high = mid - 1; // 目标值在左侧
    }
  }

  return -1; // 值未找到
}

