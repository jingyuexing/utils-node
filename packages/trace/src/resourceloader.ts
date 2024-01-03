interface TraceResource{
   duration:number;
   start:number;
   name:string
}
export function loadResource(){
   if(typeof window.performance !== "undefined"){
      const pref = window.performance
      pref.getEntriesByType("resource").forEach((prefEntry)=>{
      })
   }
}

