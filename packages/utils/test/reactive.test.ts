import { reactive } from "@/reactive";
import { describe, expect, it } from "vitest";

describe("testing reactive",()=>{
   it("testing reactive: setter",()=>{
      const { values, setter,getter } = reactive({
         name:"A9",
         age:12
      })
      setter((tartget,key,value)=>{
         if(value === "A100"){
            console.log(tartget)
         }
      })
      values.name = "A100"
      values.age = 20
      expect(values.name).eq("A100")
      expect(values.age).eq(20)
   })
})
