import { arabicToChinese } from "@/chineseNumber"
import { describe, it, expect } from "vitest"

describe("chinese number system",()=>{
   it("test number to chinese",()=>{
      let s = arabicToChinese(1032)
      console.log(s)
   })
})
