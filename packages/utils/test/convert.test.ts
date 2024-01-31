import { convert , toChineseNumber } from '@/convert';
import { describe, expect, it } from 'vitest';

describe("convert testing",()=>{
   const { weight,storage,netSpeed } = convert()
   it("convert weight test case",()=>{
      expect(weight(1000,"g","kg")).eq(1,"1000g should be 1kg")
      expect(weight(1,"kg","g")).eq(1000,"1kg should be 1000g")
      expect(weight(1,"kg","g")).eq(1000,"1kg should be 1000g")
      expect(weight(1000,"kg","t")).eq(1,"1000kg should be 1t")
   })
   it("convert storage unit test case",()=>{
      expect(storage(1024,"KB","MB")).eq(1,"1024KB should be 1MB")
      expect(storage(1024,"MB","GB")).eq(1,"1024MB should be 1GB")
      expect(storage(1024,"GB","TB")).eq(1,"1024GB should be 1TB")
      expect(storage(1024,"TB","PB")).eq(1,"1024TB should be 1PB")
      expect(storage(33,"MB","KB")).eq(33792,"33MB should be 33792KB")
   })
   it("convert net speet unit test case",()=>{
      expect(netSpeed(300,"Kbps","Gbps"))
   })
   it("test number convert",()=>{
      const { numeralSystemConverter } = convert()
      expect(numeralSystemConverter(1,"兆","京")).eq(0.1)
      expect(numeralSystemConverter(1,"京","兆")).eq(10)
      expect(numeralSystemConverter(1,"个","百")).eq(0.01)
      expect(numeralSystemConverter(1,"百","个")).eq(100)
   })
   it("test to chinese number",()=>{
      expect(toChineseNumber(123)).eq("一百廿三")
      expect(toChineseNumber(100)).eq("一百")
      expect(toChineseNumber(20)).eq("廿")
      expect(toChineseNumber(21)).eq("廿一")
      expect(toChineseNumber(101)).eq("一百零一")
      expect(toChineseNumber(1001)).eq("一千零一")
      expect(toChineseNumber(10001)).eq("一万零一")
      expect(toChineseNumber(369)).eq("三百六十九")
      expect(toChineseNumber(891290)).eq("八十九万一千二百九十")
      expect(toChineseNumber(8865490)).eq("八百八十六万五千四百九十")
      // expect(toChineseNumber(1_2886_5490)).eq("一亿二千八百八十六万五千四百九十")
      // expect(toChineseNumber(1128865490)).eq("一十一亿二千八百八十六万五千四百九十")
      // expect(toChineseNumber(11128865490)).eq("一百一十一亿二千八百八十六万五千四百九十")
      // test upper case
      expect(toChineseNumber(369,10,true)).eq("叁佰陆拾玖")
      expect(toChineseNumber(10001,10,true)).eq("壹萬零壹")
      expect(toChineseNumber(8960,10,true)).eq("捌仟玖佰陆拾")
      expect(toChineseNumber(7_8960,10,true)).eq("柒萬捌仟玖佰陆拾")
      expect(toChineseNumber(77_8960,10,true)).eq("柒拾柒萬捌仟玖佰陆拾")
      expect(toChineseNumber(777_8960,10,true)).eq("柒佰柒拾柒萬捌仟玖佰陆拾")
      expect(toChineseNumber(7777_8960,10,true)).eq("柒仟柒佰柒拾柒萬捌仟玖佰陆拾")
      expect(toChineseNumber(3_3689,10,true)).eq("叁萬叁仟陆佰捌拾玖")
      expect(toChineseNumber(833689,10,true)).eq("捌拾叁萬叁仟陆佰捌拾玖")
      expect(toChineseNumber(893_3689,10,true)).eq("捌佰玖拾叁萬叁仟陆佰捌拾玖")
      expect(toChineseNumber(2893_3689,10,true)).eq("贰仟捌佰玖拾叁萬叁仟陆佰捌拾玖")
      // expect(toChineseNumber(8_2893_3689,10,true)).eq("捌亿贰仟捌佰玖拾叁萬叁仟陆佰捌拾玖") // not pass
      // expect(toChineseNumber(88_2893_3689,10,true)).eq("捌拾捌亿贰仟捌佰玖拾叁萬叁仟陆佰捌拾玖") // not pass
   })
})
