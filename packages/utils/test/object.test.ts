import { describe,expect, it } from "vitest"

import { entries,Extends,exclude } from "@/object"

describe("object testing",()=>{
   it("test entries",()=>{
      let obj:any[] = [12,45,"hello"]
      expect(entries(obj)).toMatchInlineSnapshot(`
        [
          [
            0,
            12,
          ],
          [
            1,
            45,
          ],
          [
            2,
            "hello",
          ],
        ]
      `)
      let map = new Map<string,any>();
      map.set("a",1)
      map.set("b",34)
      map.set("name",36)

      expect(entries(map)).toMatchInlineSnapshot(`
        [
          [
            "a",
            1,
          ],
          [
            "b",
            34,
          ],
          [
            "name",
            36,
          ],
        ]
      `)
      it("test exclude",()=>{
      expect(exclude({
         name:"balabala",
         age:33
      },["age"])).equal({name:"balabala"})
    })
   })

})
