import { describe,expect, it } from "vitest"

import { isArray,isEmpty,isMap,isNull,isObject,isSet,isString,isUndefined } from "@/typeis"

describe("test typeis",()=>{
    it("test isArray",()=>{
        expect(isArray([]),"this is array").eq(true)
        expect(isArray(""),"this is not array").eq(false)
    })
    it("test isEmpty",()=>{
        expect(isEmpty("     "),"this is empty").eq(true)
        
        expect(isEmpty([]),"this is empty").eq(true)
        
        expect(isEmpty(new Set()),"this is empty").eq(true)
        
        expect(isEmpty(new Map()),"this is empty").eq(true)
        
        expect(isEmpty({}),"this is empty").eq(true)
        
        expect(isEmpty({name:""}),"this is not empty").eq(false)
        
        expect(isEmpty(["name"]),"this is not empty").eq(false)
        
        expect(isEmpty(),"this is undeined").eq(false)
    })
    it("test isMap",()=>{
        expect(isMap(new Map()),"this is map").eq(true)
    })
    it("test isMap",()=>{
        expect(isMap(new Map()),"this is map").eq(true)
        
        expect(isMap(new Set()),"this is set").eq(false)
    })
    it("test isSet",()=>{
        expect(isSet(new Set()),"this is set").eq(true)
    })
    it("test is string",()=>{
        expect(isString(undefined)).eq(false)
        
        expect(isString(null)).eq(false)
        
        expect(isString({})).eq(false)
        
        expect(isString([])).eq(false)
        
        expect(isString("[]")).eq(true)
    })
    it("test is undefined",()=>{
        expect(isUndefined("")).eq(false)
        
        expect(isUndefined(undefined)).eq(true)
        
        expect(isUndefined([])).eq(false)
    })
})