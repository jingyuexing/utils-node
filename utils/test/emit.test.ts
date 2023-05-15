import { describe,expect, it } from "vitest"
import { useEmit } from "@/emit"
describe("test emit",()=>{
    let { Emit,Handler } = useEmit()
    it("test emit handler",()=>{
        class User{
            @Emit("user")
            name(...args:any[]){
                console.log("hello")
                return args
            }
        }
        console.log(JSON.stringify(Handler("user",{name:"emit.test.ts"})))
    })
})