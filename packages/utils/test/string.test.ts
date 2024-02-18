import { describe, expect, it } from "vitest";
import { parseCertString, format, AnyToString, getPathValue, referenceString } from "@/string";
describe("parse module testing case", () => {
  it("test cert string", () => {
    const cert = parseCertString("C=US\nST=CA\nL=SF\nO=Joyent\nOU=Node.js\nCN=ca1\nemailAddress=ry@clouds.org");
    expect(cert["C"]).eq("US");
    expect(cert["ST"]).eq("CA");
    expect(cert["emailAddress"]).eq("ry@clouds.org");
    console.log(cert);
  });
  it("test format", () => {
    const map = new Map<string, string | number | boolean>();
    map.set("name", "Jim");
    map.set("uid", 13998026);
    expect(
      format("/user/:uid", {
        uid: 4399,
      }),
    ).eq("/user/4399");
    expect(
      format("/user/{uid}", {
        uid: 4399,
      }),
    ).eq("/user/4399");
    expect(
      format("/user/{name}/{uid}", {
        uid: 4399,
        name: "v",
      }),
    ).eq("/user/v/4399");
    expect(format("/user/{name}/{uid}", map)).eq("/user/Jim/13998026");
  });

  it("testing getPathValue",()=>{
   let obj = getPathValue("/user/{name}/{uid}","/user/Jim/13998026")
   expect(obj['name']).eq("Jim")
   expect(obj['uid']).eq(13998026)

   let pathValue = getPathValue("/user/{name}/{uid}","/user/Wold Nice/0xcef2396ec3")
   expect(pathValue['name']).eq("Wold Nice")
   expect(pathValue['uid']).eq("0xcef2396ec3")
  })

  it("testing anyToString", () => {
    const map = new Map<string, any>();
    map.set("a", "gf");
    map.set("aw1", 12);
    map.set("aw", {});
    expect(AnyToString("")).eq("");
    expect(AnyToString({})).eq("");
    expect(AnyToString([])).eq("");
    expect(AnyToString(map)).eq(`{"a":"gf","aw1":12,"aw":{}}`);
    expect(AnyToString({ name: "TypeScript" })).eq('{"name":"TypeScript"}');
    expect(AnyToString([1, 2, 3, 4, 5, 6, 7, 7, 8])).eq("[1,2,3,4,5,6,7,7,8]");
    expect(AnyToString(12)).eq("12");
    expect(AnyToString(889)).eq("889");
  });
  it("testing reference string",()=>{
   type AutoGen<T extends object> = {
      [K in keyof T ]:`${K & (string|number)}={${K & (string| number)}}`
   }
   const generatorByEntity = <T extends object>(entity:T):AutoGen<T>=>{
      const result = {} as AutoGen<T>;
      Object.keys(entity).forEach(key=>{
         (result as any)[key] = `${key}={${key}}`
      })
      return result
   }
   const ref = {
      table:"user",
      ...generatorByEntity({name:"",id:"",email:"",password:""}),
      create:"insert @table ({id},{name},{email})",
      byId:"where @id",
      nameIn:"`name` in ({values})",
      emailIn:"`email` in ({values})",
      byName:"where @name",
      like:"like {values}",
      likeEmail:"`email` @like",
      '😍':"like emoji 😎 😍 😘 🤩 😯 😛 🤑",
      likeName:"`name` @like",
      byEmail:"where @email",
      我:"select * from @table where name='我'",
      limit:"limit {size}",
      offset:"offset {page}",
      pagination:"@offset @limit",
      byNameAndEmail:"where @name and @email",
      select:"select * from @table",
      selectEmail:"select email from @table @byEmail",
      queryByName:"where @name",
      queryByEmail:"where @name",
      update:"update @table set @id,@name,@email",
      query:"select * from @table where @id",
      updateByName:"@update @queryByName",
      groupEmail:"group by `email`",
      groupName:"group by `name`",
      createById:"@create @byId",
      fuzzyMatchingEmail:"@select where @likeEmail @pagination",
      fuzzyMatchingName:"@select where @likeName @pagination",
      emailList:"@select @queryByEmail @groupEmail @pagination",
      nameList:"@select @queryByName @groupName @pagination",
      findName:"@select @byName",
      selectById:"@select @byId @pagination",
      findMine:"@我",
      findEmoji:"@😍"
   }

   const [refrence,parser] = referenceString(ref)
   expect(refrence.createById).eq("insert user ({id},{name},{email}) where id={id}")
   expect(refrence.findName).eq("select * from user where name={name}")
   expect(refrence.pagination).eq("offset {page} limit {size}")
   expect(refrence.emailList).eq("select * from user where name={name} group by `email` offset {page} limit {size}")
   expect(refrence.updateByName).eq("update user set id={id},name={name},email={email} where name={name}")
   expect(refrence.fuzzyMatchingName).eq("select * from user where `name` like {values} offset {page} limit {size}")
   expect(refrence.findEmoji).eq("like emoji 😎 😍 😘 🤩 😯 😛 🤑")
   expect(parser("@id")).eq("id={id}")
   expect(parser("@name")).eq("name={name}")
   expect(parser("@table")).eq("user")
   expect(parser("@id@name@email")).eq("id={id}name={name}email={email}")
   expect(parser("@id ? @name ? @email")).eq("id={id} ? name={name} ? email={email}")
   console.table({
      updateByName:refrence.updateByName,
      findByName:refrence.findName,
      emailList:refrence.emailList,
      createById:refrence.createById,
      selectByEmail:refrence.selectEmail,
      selectById:refrence.selectById,
      nameList:refrence.nameList,
      fuzzyMatchingEmail:refrence.fuzzyMatchingEmail,
      fuzzyMatchingName:refrence.fuzzyMatchingName,
      findMine:refrence.findMine,
      findEmoji:refrence.findEmoji
   })
  })
});
