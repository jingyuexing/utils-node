import { dateTimeFormat, timeFormat } from "@/datetime"
import { describe, expect, it } from "vitest"

describe("testing datetime",()=>{
   it("test datetime",()=>{
      const fill = [2024,3,30,5,12,20,0]
      const date = new Date(...fill)
      const result = timeFormat(date,"YY")
      expect(result).eq("24")

      const result2 = timeFormat(date,"YYYY-MM-dd")
      expect(result2).eq("2024-04-30")

      const result3 = timeFormat(date,"HH:mm:ss")
      expect(result3).eq("05:12:20")

      const result4 = dateTimeFormat(date,"date")
      expect(result4).eq("2024-04-30")

      const result5 = dateTimeFormat(date,"datetime")
      expect(result5).eq("2024-04-30 05:12:20")

   })
})
