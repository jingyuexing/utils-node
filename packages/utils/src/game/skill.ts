export function skill(effect: () => void, interval: number, duration: number) {
  const start = Date.now();
  const timer = setInterval(function () {
    const elapsedTime = Date.now() - start;
    if (elapsedTime >= duration) {
      clearInterval(timer);
    } else {
      effect();
    }
  }, interval);
}


export function dropRate(luck:number,base:number):boolean{
   const adjustedDropRate = base * (luck / 100);
   return Math.random() < adjustedDropRate
}
