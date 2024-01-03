export function wordDiff(word: string, target: string) {
  const m = word.length;
  const n = target.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word[i - 1] === target[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  let diffIndex = m;
  while (diffIndex > 0 && dp[diffIndex][n] === dp[diffIndex - 1][n]) {
    diffIndex--;
  }

  const startIndex = diffIndex - 1;
  const endIndex = m - 1;

  if (dp[m][n] === 1 && startIndex >= 0 && word[startIndex] === target[startIndex + 1] && word[startIndex + 1] === target[startIndex]) {
    return [startIndex, endIndex, target];
  } else {
    return [startIndex + 1, endIndex, target];
  }
}

export function vectorDiff(source: string, target: string) {
  const sourceVector = source.split("").map((value) => value.charCodeAt(0))
  const targetVector = source.split("").map((value) => value.charCodeAt(0))
  const mod = (a:number[],b:number[]) => 0
  const pi = (a:number[])=>a.reduce((pre,cur)=>pre*cur,1)
  const sum = (a:number[])=>a.reduce((a,b)=>a+b,0)
}
