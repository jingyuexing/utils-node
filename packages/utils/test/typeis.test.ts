import { describe, expect, it } from 'vitest';

import {
   isArray,
   isArrayLike,
   isAsyncFunction,
   isEmpty,
   isInfinity,
   isMap,
   isNull,
   isObject,
   isPrimitive,
   isPromiseLike,
   isSet,
   isString,
   isThat,
   isUndefined,
} from '@/typeis';

describe('test typeis', () => {
   it('test isArray', () => {
      expect(isArray([]), 'this is array').eq(true);
      expect(isArray(''), 'this is not array').eq(false);
   });
   it('test isEmpty', () => {
      expect(isEmpty('     '), 'this is empty').eq(true);

      expect(isEmpty([]), 'this is empty').eq(true);

      expect(isEmpty(new Set()), 'this is empty').eq(true);

      expect(isEmpty(new Map()), 'this is empty').eq(true);

      expect(isEmpty({}), 'this is empty').eq(true);

      expect(isEmpty({ name: '' }), 'this is not empty').eq(false);

      expect(isEmpty(['name']), 'this is not empty').eq(false);

      expect(isEmpty(), 'this is empty').eq(true);
      expect(isEmpty(null),"this is empty").eq(true)

      expect(isEmpty({
         [Symbol('a')]:12
      })).eq(false,"this should be false")
   });
   it('test isMap', () => {
      expect(isMap(new Map()), 'this is map').eq(true);
   });
   it('test isMap', () => {
      expect(isMap(new Map()), 'this is map').eq(true);

      expect(isMap(new Set()), 'this is set').eq(false);
   });
   it('test isSet', () => {
      expect(isSet(new Set()), 'this is set').eq(true);
   });
   it('test is string', () => {
      expect(isString(undefined)).eq(false);

      expect(isString(null)).eq(false);

      expect(isString({})).eq(false);

      expect(isString([])).eq(false);

      expect(isString('[]')).eq(true);
   });
   it('test is undefined', () => {
      expect(isUndefined('')).eq(false);

      expect(isUndefined(undefined)).eq(true);

      expect(isUndefined([])).eq(false);
   });
   it('test null or undefined', () => {
      expect(isNull([])).eq(false);
      expect(isNull('')).eq(false);
      expect(isNull(null)).eq(true);

      let s;
      expect(isUndefined(s)).eq(true);

      expect(isUndefined(undefined)).eq(true);
   });

   it('test isArrayLike', () => {
      expect(isArrayLike({ length: 10 })).eq(true);

      expect(isArrayLike([])).eq(true);
   });
   it("test isThat",()=>{
      class A {

      }
      const s = new A()

      class Some {

      }
      const b = new Some();
      expect(isThat(s,A)).eq(true)
      expect(isThat(b,Some)).eq(true)
   })
   it("test async function",()=>{
      const func1 = async ()=>{}
      expect(isAsyncFunction(func1)).eq(true)
   })
   it("test primitive",()=>{
      expect(isPrimitive(0)).eq(true)
      expect(isPrimitive("")).eq(true)
      expect(isPrimitive(BigInt(12))).eq(true)
      expect(isPrimitive(true)).eq(true)
      expect(isPrimitive(false)).eq(true)
      expect(isPrimitive(undefined)).eq(true)
   })
   it("test infinity",()=>{
      expect(isInfinity(Infinity)).eq(true)
      expect(isInfinity(-Infinity)).eq(true)
      expect(isInfinity(0)).eq(false)
      expect(isInfinity(1)).eq(false)
   })
   it("test promise like",()=>{
      expect(isPromiseLike(new Promise(()=>{}))).eq(true)
      expect(isPromiseLike(async ()=>{})).eq(false)
      const likePromise = {
         then(){

         }
      }
      expect(isPromiseLike(likePromise)).eq(true)
   })
});
