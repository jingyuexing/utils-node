export function duration(date: Date, time: `${number}${Utils.DurationUnits}`) {
   enum EUnits {
      SECOND = 1000,
      MINUTE = EUnits.SECOND * 60,
      HOUR = EUnits.MINUTE * 60,
      DAY = EUnits.HOUR * 24,
      WEEK = EUnits.DAY * 7,
      MONTH = EUnits.DAY * 30,
      YEAR = EUnits.DAY * 365
   }
   let Units = {
      'Y': EUnits.YEAR,
      'M': EUnits.MONTH,
      'w': EUnits.WEEK,
      'd': EUnits.DAY,
      'h': EUnits.HOUR,
      'm': EUnits.MINUTE,
      's': EUnits.SECOND,
      '甲子': EUnits.YEAR * 60
   }
   let durationTime = 0
   for (let dur of time.split(" ")) {
      let number = /[+-]?\d+/
      let numstr = number.test(dur) ? dur.match(number)![0] : ""
      if (numstr != "") {
         let timeValue = parseInt(numstr)
         let unit = dur.slice(numstr.length) as Utils.DurationUnits
         if (Object.keys(Units).includes(unit)) {
            durationTime += timeValue * Units[unit]
         } else {
            throw new TypeError(`unknow unit ${unit}`)
         }
      } else {
         throw TypeError(`can't process this time format: ${dur}`)
      }
   }
   let nowTime = date.getTime()
   let durDate = new Date()
   durDate.setTime(nowTime + durationTime)
   return durDate
}
