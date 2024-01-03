import { typeis } from "@/typeis";

export function useFuzzyMatching(orgin:string[],matching:string):string[];
export function useFuzzyMatching(orgin:string,matching:string):boolean;
export function useFuzzyMatching(...args:any[]){
   const regexp = new RegExp(`.*${args[1] as string}.*`,'i')
   if(typeis(args[0]) === "array"){
      return (args[0] as string[]).filter((value)=>regexp.test(value))
   }
   if(typeis(args[0]) === "string") {
      return regexp.test(args[0])
   }
}
