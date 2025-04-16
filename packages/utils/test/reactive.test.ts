import { reactive } from "@/reactive";
import { describe, expect, it } from "vitest";
import { isNumber } from "@/typeis";

describe("testing reactive", () => {
   it("testing reactive: setter", () => {
      const { values, setter, getter } = reactive({
         name: "A9",
         age: 12
      })
      setter((tartget, key, value) => {
         if (value === "A100") {
            console.log(tartget)
         }
      })
      values.name = "A100"
      values.age = 20
      expect(values.name).eq("A100")
      expect(values.age).eq(20)
   })
   it("testing reactive filter", () => {
      const { values, setter, getter } = reactive({
         a: "12",
         b: 33,
         c: 44,
         f: "12"
      }, (k, v) => !isNumber(v))
      let s = 0
      setter((t, k, v) => {
         s++
         console.log(k)
      })
      values.a = "233333"
      getter((t, key) => {
         console.log(key)
      })
      expect(s).eq(1)

   })
})
