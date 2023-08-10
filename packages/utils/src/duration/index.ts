import type { DurationUnits } from "../types";

/**
 * generator a specified date
 * @param {Date}   date now
 * @param {`${number}${DurationUnits}`} time [description]
 */
export function duration(date: Date, time: `${number}${DurationUnits}`) {
   enum EUnits {
      SECOND = 1000,
      MINUTE = EUnits.SECOND * 60,
      HOUR = EUnits.MINUTE * 60,
      DAY = EUnits.HOUR * 24,
      WEEK = EUnits.DAY * 7,
      MONTH = EUnits.DAY * 30,
      YEAR = EUnits.DAY * 365,
   }
   const units = {
      Y: EUnits.YEAR,
      M: EUnits.MONTH,
      w: EUnits.WEEK,
      d: EUnits.DAY,
      h: EUnits.HOUR,
      m: EUnits.MINUTE,
      s: EUnits.SECOND,
      甲子: EUnits.YEAR * 60,
   };
   let durationTime = 0;
   for (const dur of time.split(' ')) {
      const number = /[+-]?\d+/;
      const numstr = number.test(dur) ? dur.match(number)![0] : '';
      if (numstr !== '') {
         const timeValue = parseInt(numstr);
         const unit = dur.slice(numstr.length) as DurationUnits;
         if (Object.keys(units).includes(unit)) {
            durationTime += timeValue * units[unit];
         } else {
            throw new TypeError(`unknow unit ${unit}`);
         }
      } else {
         throw TypeError(`can't process this time format: ${dur}`);
      }
   }
   const nowTime = date.getTime();
   const durDate = new Date();
   durDate.setTime(nowTime + durationTime);
   return durDate;
}
