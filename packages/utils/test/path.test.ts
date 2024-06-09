import { describe, expect, it } from "vitest"
import { Path } from "@/path"
describe("path testing case", () => {
   it("path name", () => {

      const p = new Path("a/t/d/s/k.txt")
      expect(p.extension).eq("txt")
      expect(p.name).eq("k")
   })
   it("path params", () => {

      let p = new Path("a/t/d/s/:id")
      p = p.path({
         "id": 12
      })
      expect(p.name).eq("12")
      expect(p+"").eq("a/t/d/s/12")
   })
   it("path relative",()=>{
      let p = new Path("/a/b/c/../normal.txt")
      expect(p+"").eq("/a/b/normal.txt")
   })
   it("path parent",()=>{
      let p = new Path("/a/b/c").parent()
      expect(p.toString()).eq("/a/b")
   })
})
