import { describe,expect, it } from "vitest";
import { parseCertString,format } from "@/string"
describe("parse module testing case",()=>{
    it("test cert string",()=>{
        let cert = parseCertString("C=US\nST=CA\nL=SF\nO=Joyent\nOU=Node.js\nCN=ca1\nemailAddress=ry@clouds.org")
        expect(cert["C"]).eq("US")
        expect(cert["ST"]).eq("CA")
        expect(cert["emailAddress"]).eq("ry@clouds.org")
        console.log(cert)
    })
    it("test format",()=>{
      let map = new Map<string,string|number>();
      map.set("name","Jim")
      map.set("uid",13998026)
      expect(format("/user/:uid",{
         uid:4399
      })).eq("/user/4399")
      expect(format("/user/{uid}",{
         uid:4399
      })).eq("/user/4399")
      expect(format("/user/{name}/{uid}",{
         uid:4399,
         name:"v",
      })).eq("/user/v/4399")
      expect(format("/user/{name}/{uid}",map)).eq("/user/Jim/13998026")
    })
})
