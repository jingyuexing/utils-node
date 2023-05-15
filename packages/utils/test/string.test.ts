import { describe,expect, it } from "vitest";
import { parseCertString } from "@/string"
describe("parse module testing case",()=>{
    it("test cert string",()=>{
        let cert = parseCertString("C=US\nST=CA\nL=SF\nO=Joyent\nOU=Node.js\nCN=ca1\nemailAddress=ry@clouds.org")
        expect(cert["C"]).eq("US")
        expect(cert["ST"]).eq("CA")
        expect(cert["emailAddress"]).eq("ry@clouds.org")
        console.log(cert)
    })
})