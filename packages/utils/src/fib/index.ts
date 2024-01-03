export function fib(n:number){
   const dp:number[] = [1,1]
   for(let i =2;i < n;i++){
      dp.push(dp[i-1]+dp[i-2])
   }
   return dp[n-1]
}
