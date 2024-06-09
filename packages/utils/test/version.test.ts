import { greatThan,version, versionValidate } from "@/version"
import { describe, it, expect } from "vitest"
describe("test version parse",()=>{
   it("test versionValidate",()=>{
      expect(versionValidate("0.0.1")).eq(true)
      expect(versionValidate("v0.0.1")).eq(true)
      expect(versionValidate("v0.0.1-12")).eq(true)
      expect(versionValidate("v0.0.1-12-alpha")).eq(true)
      expect(versionValidate("v0.0.1-12+alpha")).eq(true)
   })
   it("test version parse",()=>{
      let ver = version("0.0.1");
      expect(ver?.major).eq(0)
      expect(ver?.minor).eq(0)
      expect(ver?.patch).eq(1)
   })
   it("test greatThan",()=>{
      expect(greatThan("0.0.1","0.0.2")).eq(false)
      expect(greatThan("0.0.2","0.1.3")).eq(false)
      expect(greatThan("0.3.2","0.1.3")).eq(true)
   })
   it("test compare version",()=>{
      expect(version("0.0.1")!.gt("0.0.2")).eq(false)
      expect(version("0.0.2")?.eq("0.0.2")).eq(true)
      expect(version("0.0.2")?.lt("0.1.2")).eq(true)
      expect(version("0.1.2")?.ge("0.0.2")).eq(true)
   })
})
