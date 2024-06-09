import { describe, expect, it } from "vitest"
import { Result } from "@/result"


describe("testing result",()=>{
   it("testing isErr and isOK",()=>{
      const { err,isErr,isOk } = Result()
      const failedResponse = err("failed")
      expect(isErr(failedResponse)).eq(true)
      expect(isOk(failedResponse)).eq(false)
   })

   it("testing unwrapOr",()=>{
      const { err,isErr,isOk,unwrapOr } = Result()
      expect(unwrapOr(err("404"),"not found")).eq("not found")
   })

   it("testing tryCatch",()=>{
      const { tryCatch,err } = Result()
      expect(tryCatch(()=>{throw Error("404")}).ok).eq(false)
   })
})
