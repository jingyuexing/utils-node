interface Point {
  x: number;
  y: number;
}

/**
 * Ramer-Douglas-Peucker算法
 * @param points 点集
 * @param epsilon 抽样精度
 * @returns 抽样后的点集
 */
function rdp(points: Point[], epsilon: number): Point[] {
  if (points.length < 3) {
    return points; // 如果点集只有两个点，直接返回
  }

  const stack: [number, number][] = [[0, points.length - 1]]; // 使用栈保存待处理的线段
  const result: Point[] = []; // 抽样结果

  while (stack.length > 0) {
    // rome-ignore lint/style/noNonNullAssertion: <explanation>
   const  [start, end] = stack.pop()!; // 取出待处理的线段

    // 找到距离起点和终点最远的点
    let dmax = 0;
    let index = start;
    for (let i = start + 1; i < end; i++) {
      const d = perpendicularDistance(points[i], points[start], points[end]);
      if (d > dmax) {
        index = i;
        dmax = d;
      }
    }

    // 如果最远点距离小于抽样精度，直接加入起点和终点
    if (dmax < epsilon) {
      result.push(points[start], points[end]);
      continue;
    }

    // 将线段拆分成左右两个部分
    stack.push([start, index]);
    stack.push([index, end]);
  }

  return result;
}

/**
 * 计算点到线段的垂直距离
 * @param p 点
 * @param a 线段起点
 * @param b 线段终点
 * @returns 垂直距离
 */
function perpendicularDistance(p: Point, a: Point, b: Point): number {
  const x = p.x;
  const y = p.y;
  const x1 = a.x;
  const y1 = a.y;
  const x2 = b.x;
  const y2 = b.y;

  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let xx:number,yy:number;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
