import { describe, expect, it } from "vitest"
import { validate } from "../src/validate"

describe("validate testing",()=>{
   it("testing require",()=>{
      const { values } = validate({
         age:"require;max=10"
      })
      values.age = 12
      expect(values.age).eq(undefined)
   })
   it("testing oneof",()=>{
      const { values } = validate({
         name:"min=3;max=6",
         with:"oneof=A,B,C,D,E,F"
      })
      values.name = "A"
      expect(values.name).eq(undefined)
      values.name = "Angle"
      expect(values.name).eq("Angle")
      values.with = "S"
      expect(values.with).eq(undefined)
      values.with = "C"
      expect(values.with).eq("C")
   })
   it("testing gt,gte,lt,lte",()=>{
      const { values,error } = validate({
         age:"gt=18;lt=30"
      })
      error((msg)=>{
         console.log(msg)
      })
      values.age = 33
      expect(values.age).eq(undefined)
      values.age = 25
      expect(values.age).eq(25)

   })
   it("testing is",()=>{
      const { values } = validate({
         address:"is:eth"
      })
      values.address = "0x74b47e789702166b5d4ccc1bdfdcaac5217065f9b3ae76d8d8c0158eaec91cd4"
      expect(values.address).eq(values.address)
   })
})
