import { describe, expect, it } from "vitest";

import { entries, Extends, exclude, renameKey, traverseObject, OmitObjectKeys, PickObjectKeys, objectFilter, settingZeroValue as settingZeroValue, nestedObject } from "@/object";
import { isString } from "..";

describe("object testing", () => {
  it("test entries", () => {
    let obj: any[] = [12, 45, "hello"];
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
      `);
    let map = new Map<string, any>();
    map.set("a", 1);
    map.set("b", 34);
    map.set("name", 36);

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
      `);
    expect(entries([12, 33, 56, 89])).toMatchInlineSnapshot(`
        [
          [
            0,
            12,
          ],
          [
            1,
            33,
          ],
          [
            2,
            56,
          ],
          [
            3,
            89,
          ],
        ]
      `);
    expect(
      entries({
        name: "Typescript",
        type: "Programing Language",
      }),
    ).toMatchInlineSnapshot(`
        [
          [
            "name",
            "Typescript",
          ],
          [
            "type",
            "Programing Language",
          ],
        ]
      `);
  });
  it("test exclude", () => {
    expect(
      exclude(
        {
          name: "balabala",
          age: 33,
        },
        ["age"],
      ),
    ).toMatchInlineSnapshot(`
        {
          "name": "balabala",
        }
      `);
  });
  it("testing rename key", () => {
    expect(
      renameKey(
        {
          a: "Bib",
          b: "1h",
        },
        {
          a: "name",
          b: "time",
        },
      ),
    ).toMatchInlineSnapshot(`
        {
          "name": "Bib",
          "time": "1h",
        }
      `);
  });
  it("test traverseObject",()=>{
   const obj = {
      a:{
         b:{
            kol:{
               final:12
            }
         },
         x:{
            m:[true,false,"some"]
         }
      }
   }
   const traverse = traverseObject(obj)
   console.table(traverse)
   expect(traverse['a.b.kol.final']).eq(12)
   expect(traverse['a.x.m.0']).eq(true)
   expect(traverse['a.x.m.1']).eq(false)
   expect(traverse['a.x.m.2']).eq("some")


   const traverse2 = traverseObject(obj,"\\")
   console.table(traverse2)
   expect(traverse2['a\\b\\kol\\final']).eq(12)
   expect(traverse2['a\\x\\m\\0']).eq(true)
   expect(traverse2['a\\x\\m\\1']).eq(false)
   expect(traverse2['a\\x\\m\\2']).eq("some")

   const traverse3 = traverseObject(obj,"/")
   console.table(traverse3)
   expect(traverse3['a/b/kol/final']).eq(12)
   expect(traverse3['a/x/m/0']).eq(true)
   expect(traverse3['a/x/m/1']).eq(false)
   expect(traverse3['a/x/m/2']).eq("some")

   const traverse4 = traverseObject(obj,"->")
   console.table(traverse4)
   expect(traverse4['a->b->kol->final']).eq(12)
   expect(traverse4['a->x->m->0']).eq(true)
   expect(traverse4['a->x->m->1']).eq(false)
   expect(traverse4['a->x->m->2']).eq("some")

   const traverse5 = traverseObject(obj,")")
   console.table(traverse5)
   expect(traverse5['a)b)kol)final']).eq(12)
   expect(traverse5['a)x)m)0']).eq(true)
   expect(traverse5['a)x)m)1']).eq(false)
   expect(traverse5['a)x)m)2']).eq("some")
  })

  it("test Omit object",()=>{
   const omitObj = OmitObjectKeys({
      name:"",
      gender:"",
      AOL:12
   },["name"])
   console.table(omitObj)
   expect(Object.keys(omitObj).includes('name')).eq(false)
   expect(Object.keys(omitObj).includes('gender')).eq(true)
  })
  it("test Pick Object",()=>{
   const pickObj = PickObjectKeys({
      name:"No party of Cao dong",
      other:""
   },["name"])
   expect(Object.keys(pickObj).includes("name")).eq(true)
   expect(Object.keys(pickObj).includes("other")).eq(false)
  })

  it("test objectFilter",()=>{
   const obj = objectFilter({
      name:"",
      gender:"",
      AOL:12
   },(key,value)=>{
      return isString(value) ? value.length > 10 : value > 10
   })
   expect((obj as any)['name']).eq(undefined)
   expect((obj as any)['AOL']).eq(12)
  })

  it("testing zeroValue",()=>{
   const obj = {
      name:"",
      age:0,
      address:"",
      tags:[],
      others:{},
      people:{
         some:"thing"
      }
   }
   let result = settingZeroValue(obj,{
      string:"N/A",
      number:-1,
      array:[0,0,0,0],
      object:{
         ["unknown"]:true
      }
   })

   expect(result["name"]).eq("N/A")
   expect(result["name"]).eq("N/A")
   expect(result["age"]).eq(-1)
   expect(result["tags"].length).eq(4)
   expect((result["others"] as any)["unknown"]).eq(true)
   expect((result["people"] as any)["unknown"]).eq(undefined)
  })

  it("testing nestObject",()=>{
   const obj = {
      a:{
         b:{
            kol:{
               final:12
            }
         },
         x:{
            m:[true,false,"some"]
         },
         o:{
            l:"N/A",
            k:"UNKNOW"
         }
      }
   }
   expect(nestedObject(obj,"a.b.kol.final")).eq(12)
   expect(nestedObject(obj,"a.x.m.0")).eq(true)
   expect(nestedObject(obj,"a.x.m.1")).eq(false)
   expect(nestedObject(obj,"a_x_m_2","_")).eq("some")
   expect(nestedObject(obj,"a_x_m_2","_")).eq("some")
   expect(nestedObject(obj,"a/o/l","/")).eq("N/A")
   expect(nestedObject(obj,"a/o/k","/")).eq("UNKNOW")
  })
});

