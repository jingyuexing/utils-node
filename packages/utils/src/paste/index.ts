import { isNone } from "@/typeis";

export function usePaste(el:HTMLElement){
   navigator.clipboard.readText().then((val)=>{

   })
   navigator.clipboard.read().then((val)=>{

   })

   document.addEventListener("paste",(e)=>{
      if(e.clipboardData?.files){
         for(const file of e.clipboardData.files){
            const reader = new FileReader()
            reader.onload = (e)=>{
               e.target?.result
            }
         }
      }
   })
}
