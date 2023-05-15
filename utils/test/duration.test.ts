import { duration } from "../src/duration"
import { describe,expect, it } from "vitest"


describe("testing duration",()=>{
    let now = new Date(2023,3,16,8,24)
    it("test week",()=>{
        let dur = duration(now,"1w")
        console.log(dur)
        expect(dur.getDate() - now.getDate()).eq(7)
    })
    it("test hour",()=>{
        let dur = duration(now,"1h")
        console.log(dur)
        expect(dur.getHours()).eq(9)
        expect(dur.getMinutes()).eq(24)
    })
    it("test Month",()=>{
        let dur = duration(now,"1M")
        console.log(dur)
        expect(dur.getMonth()).eq(4)
    })
    it("test year",()=>{
        let dur = duration(now,'1Y')
        let dur2 = duration(now,'-1Y')
        console.log(dur)
        expect(dur.getFullYear()).eq(2024)
        expect(dur2.getFullYear()).eq(2022)
    })
    it("test compose",()=>{
        let dur = duration(now,"1Y 1M 1d")
        console.log(dur)
        expect(dur.getFullYear()).eq(2024)
        expect(dur.getMonth()).eq(4)
        expect(dur.getDate()).eq(16)
    })
})