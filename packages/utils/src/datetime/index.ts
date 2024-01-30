import { isString } from ".."

type FormatYear = "YY" | "YYYY"
type FormatMonth = "MM" | "M"
type FormatDateOfMonth = "dd"
type FormatHour = "H" | "HH"
type FormatMinute = "mm"
type FormatMilionSecond = "ms"
type FormatSecond = "ss"
type FormatWeek = "W" | "WW"

type FormatDate =
   `${FormatYear}-${FormatMonth}-${FormatDateOfMonth}`
   | `${FormatMonth}-${FormatDateOfMonth}-${FormatYear}`
   | `${FormatYear}/${FormatMonth}/${FormatDateOfMonth}`
   | `${FormatMonth}/${FormatDateOfMonth}/${FormatYear}`
type FormatTime =
   `${FormatHour}:${FormatMinute}`
   | `${FormatHour}:${FormatMinute}:${FormatSecond}`
   | `${FormatHour}:${FormatMinute}:${FormatSecond}.${FormatMilionSecond}`
type FormatTemplate =
   `${FormatYear}`
   | `${FormatMonth}`
   | `${FormatDate}`
   | `${FormatTime}`
   | `${FormatDate} ${FormatTime}`
   | `${FormatMinute}`
   | `${FormatSecond}`
   | `${FormatWeek}`

export function timeFormat(date: Date, format: FormatTemplate) {
   let formated = format as string
   const formatObject: Record<FormatYear | FormatWeek | FormatMilionSecond | FormatDate | FormatMonth | FormatHour | FormatMinute | FormatSecond, number> = {
      YYYY: date.getFullYear(),
      YY: date.getFullYear() % 100,
      MM: date.getMonth() + 1,
      M: date.getMonth() + 1,
      dd: date.getDate(),
      HH: date.getHours(),
      H: date.getHours() % 12,
      ss: date.getSeconds(),
      mm: date.getMinutes(),
      ms: date.getMilliseconds(),
      W: date.getDay(),
      WW: date.getDay(),
   }
   for (const key in formatObject) {
      formated = formated.replace(
         new RegExp(`${key}`, 'g'),
         formatObject[key as keyof typeof formatObject].toString().padStart(key.length, "0")
      ) as string
   }
   return formated;
}

export function dateTimeFormat(date: Date, format: "date" | "time" | "datetime" | "utc") {
   if (!isString(format)) {
      throw TypeError(`the format must be string, but is ${typeof format}`)
   }
   const formatMap: Record<"time" | "datetime" | "utc" | "date", string> = {
      "time": "HH:mm:ss",
      date: "YYYY-MM-dd",
      datetime: "YYYY-MM-dd HH:mm:ss",
      utc: "YYYY-MM-ddTHH:mm:ss.msZ"
   }
   return timeFormat(date, formatMap[format] as FormatTemplate)
}
