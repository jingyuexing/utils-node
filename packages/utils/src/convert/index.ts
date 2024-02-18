export function convert() {
   const length = (
      value: number,
      from: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm",
      to: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm",
   ) => {
      const units = {
         m: 100,
         km: 1000,
         cm: 1,
         mm: 0.01,
         um: 1e-3,
         nm: 1e-6,
         dm: 10,
      };
      return (value * units[from]) / units[to];
   };
   const weight = (value: number, from: "g" | "kg" | "mg" | "t", to: "g" | "kg" | "mg" | "t") => {
      const units = {
         g: 1,
         kg: 1000,
         mg: 0.001,
         t: 1000000,
      };
      const unit = Object.keys(units);
      if (unit.indexOf(from) === -1 || unit.indexOf(to) === -1) {
         throw new Error("Invalid weight unit");
      }
      return (value * units[from]) / units[to];
   };
   const size = (value: number, from: "k" | "w" | "m", to: "k" | "w" | "m") => {
      const units = {
         k: 1000,
         w: 10000,
         m: 1000000,
      };
      return (value * units[from]) / units[to];
   };
   /**
    * Converts units of volume in the metric system.
    * @param {number} value - The value to be converted.
    * @param {"ml" | "cl" | "dl" | "l"} from - The unit to convert from ("ml": milliliters, "cl": centiliters, "dl": deciliters, "l": liters).
    * @param {"ml" | "cl" | "dl" | "l"} to - The unit to convert to ("ml": milliliters, "cl": centiliters, "dl": deciliters, "l": liters).
    * @returns {number} - The converted value.
    */
   const volumn = (value: number, from: "ml" | "cl" | "dl" | "l", to: "ml" | "cl" | "dl" | "l") => {
      const units = {
         ml: 1,
         cl: 10,
         dl: 100,
         l: 1000,
      };

      return (value * units[from]) / units[to];
   };
   /**
    * Converts units of volume in the EN customary system.
    * @param {number} value - The value to be converted.
    * @param {"oz" | "pt" | "qt" | "gal"} from - The unit to convert from ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
    * @param {"oz" | "pt" | "qt" | "gal"} to - The unit to convert to ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
    * @returns {number} - The converted value.
    */
   const volumnEN = (value: number, from: "oz" | "pt" | "qt" | "gal", to: "oz" | "pt" | "qt" | "gal") => {
      const units = {
         oz: 1,
         pt: 20,
         qt: 40,
         gal: 160,
      };

      return (value * units[from]) / units[to];
   };
   /**
    * Converts units of volume in the US customary system.
    * @param {number} value - The value to be converted.
    * @param {"oz" | "pt" | "qt" | "gal"} from - The unit to convert from ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
    * @param {"oz" | "pt" | "qt" | "gal"} to - The unit to convert to ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
    * @returns {number} - The converted value.
    */
   const volumeUS = (value: number, from: "oz" | "pt" | "qt" | "gal", to: "oz" | "pt" | "qt" | "gal") => {
      const units = {
         oz: 1,
         pt: 16,
         qt: 32,
         gal: 128,
      };

      return (value * units[from]) / units[to];
   };
   type StorageUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";
   const storage = (value: number, from: StorageUnit, to: StorageUnit): number => {
      const units: StorageUnit[] = ["B", "KB", "MB", "GB", "TB", "PB"];
      const fromIndex = units.indexOf(from);
      const toIndex = units.indexOf(to);

      if (fromIndex === -1 || toIndex === -1) {
         throw new Error("Invalid storage unit");
      }

      const diff = toIndex - fromIndex;

      if (diff === 0) {
         return value;
      }

      const factor = 1024 ** Math.abs(diff);
      return diff > 0 ? value / factor : value * factor;
   };
   type NetworkUnit = "bps" | "Kbps" | "Mbps" | "Gbps";
   const netSpeed = (speed: number, from: NetworkUnit, to: NetworkUnit): number => {
      const networkUnitTable: Record<NetworkUnit, number> = {
         bps: 1,
         Kbps: 1000,
         Mbps: 1000000,
         Gbps: 1000000000,
      };
      if (!(from in networkUnitTable) || !(to in networkUnitTable)) {
         throw new Error("Invalid network unit");
      }
      const fromFactor = networkUnitTable[from as keyof typeof networkUnitTable];
      const toFactor = networkUnitTable[to];

      return (speed * fromFactor) / toFactor;
   };

   const unitWords = [
      "个",
      "十",
      "百",
      "千",
      "万",
      "亿",
      "兆",
      "京",
      "垓",
      "秭",
      "穰",
      "沟",
      "涧",
      "正",
      "载",
      "极",
      "恒河沙",
      "阿僧祇",
      "那由他",
      "不可思议",
      "无量大数",
   ] as const;
   /**
    * [numeralSystemConverter description]
    * @param {number} value
    * @param {"个"|"十"|"百"|"千"|"万"|"亿"|"兆"|"京"|"垓"|"秭"|"穰"|"沟"|"涧"|"正"|"载"|"极"|"恒河沙"|"阿僧祇"|"那由他"|"不可思议"|"无量大数"} from The unit to convert from
    * @param {"个"|"十"|"百"|"千"|"万"|"亿"|"兆"|"京"|"垓"|"秭"|"穰"|"沟"|"涧"|"正"|"载"|"极"|"恒河沙"|"阿僧祇"|"那由他"|"不可思议"|"无量大数"} to The unit to convert to
    */
   function numeralSystemConverter(value: number, from: typeof unitWords[number], to: typeof unitWords[number]) {
      const fromIndex = unitWords.indexOf(from);
      const toIndex = unitWords.indexOf(to);

      if (fromIndex === -1 || toIndex === -1) {
         return -1;
      }

      const exponent = Math.abs(fromIndex - toIndex);
      const multiplier = fromIndex > toIndex ? Math.pow(10, exponent) : 1 / Math.pow(10, exponent);

      return value * multiplier;
   }
   const MoneyUnit = ["贯","两","文","钱","分","厘"] as const
   function chineseMoneyUnit(val:number,from:typeof MoneyUnit[number],to:typeof MoneyUnit[number]){
      if(!(MoneyUnit.includes(from) && MoneyUnit.includes(to))){
         return -1
      }
      const unit = [100,1,0.1,0.1,0.01,0.001]
      return (val * unit[MoneyUnit.indexOf(from)]) / unit[MoneyUnit.indexOf(to)]
   }
   return {
      length,
      weight,
      size,
      storage,
      netSpeed,
      volumn,
      volumnEN,
      volumeUS,
      numeralSystemConverter,
      chineseMoneyUnit
   };
}

/**
 * 将数字转换为中文数字表示法。
 *
 * @param {number} number 要转换的数字。
 * @param {number} [base=10] 数字的进制，默认为十进制。
 * @param {boolean} [upper=false] 是否使用大写中文数字，默认为小写。
 * @param {boolean} [trans=false] 是否将二十转为廿
 * @returns {string} 转换后的中文数字字符串。
 */
export function toChineseNumber(number: number, base: number = 10, upper: boolean = false, trans = false): string {
   let digits: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
   let units: string[] = ["", "十", "百", "千", "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极"];

   if (upper) {
      digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      units = ["", "拾", "佰", "仟", "萬", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极"];
   }

   let result = "";

   let quotient = Math.abs(number);
   if (base > digits.length) {
      return "";
   }

   let unitIndex = 0;
   let idx = 0;
   let composeUnidex = 0
   while (quotient > 0) {
      const remainder = quotient % base;
      if (remainder > 0 || idx === 0 || (idx === 1 && quotient % 10 === 0)) {
         if (trans && idx === 1 && (remainder === 2 || remainder === 3)) {
            if (remainder === 2) {
               result = "廿" + result;
            }
            if (remainder === 3) {
               //
            }
         } else {
            if (remainder === 0 && idx > 0) {
               result = digits[remainder] + result;
            } else if (unitIndex / 4 > 1) {
               // composeUnidex ++
               result = digits[remainder] + (units[composeUnidex]) + result;
            } else {
               result = digits[remainder] + units[unitIndex] + result;
            }
         }
      }
      quotient = Math.floor(quotient / base);
      idx++;
      unitIndex++;
      composeUnidex = (unitIndex % 4)
   }

   if (number < 0) {
      return "负" + result;
   } else if (result === "") {
      return digits[0];
   } else {
      return removeTrailingZero(result);
   }
}

function removeTrailingZero(str: string): string {
   while (str.length > 1 && str.slice(-1) === "零") {
      str = str.slice(0, -1);
   }
   return str;
}

function numberStringCallback(remainder: number, unit: number): [remainder: string, unit: string, digitsLength: number] {
   const numberMap = {
      "number": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-$".split(''),
   }
   return [numberMap['number'][remainder], "", numberMap['number'].length]
}

/**
 * [numberToString description]
 * @param  {number}    number   需要转换的数字
 * @param  {number}    [base=10]     转换进制
 * @param  {(remainder: number, unit: number)=>[remainder: string, unit: string, digits: number]} [callback=numberStringCallback] 数字字符串格式化函数
 * @return {string}  转换结果
 */
export function numberToString(number: number, base: number = 10, callback: typeof numberStringCallback = numberStringCallback): string {
   let quotient = Math.abs(number)
   let [, , digitsLength] = callback(0, 0)
   if (base > digitsLength) {
      return ""
   }
   let result = ""
   let unitIndex = 0
   while (quotient > 0) {
      let remainder = quotient % base
      let [digits, unit] = callback(remainder, unitIndex)
      result = digits + unit + result
      quotient = Math.floor(quotient / base)
      unitIndex++;
   }
   if (number < 0) {
      return "-" + result
   } else {
      return result
   }
}

function stringToNumberCallback(digits:string):number{
   let _digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-$".split("")
   return _digits.indexOf(digits)
}

/**
 * [numberToString description]
 * @param  {number}    number   需要转换的字符串
 * @param  {number}    [base=10]     转换进制
 * @param  {(digits:string)=>number} [callback=stringToNumberCallback] 字符串格式化函数
 * @return {number}  转换结果
 */
export function stringToNumber(str:string,base=10,callback=stringToNumberCallback){
   let result = 0
   let power = 1
   let number = str.split("")
   for(let i = number.length;i>0;i--){
      let val = callback(number[i-1])
      result += (val * power)
      power *= base
   }
   return result
}
