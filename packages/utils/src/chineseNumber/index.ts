const chineseNumerals = {
  '零': 0,
  '一': 1,
  '二': 2,
  // '两': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '十': 10,
  '百': 100,
  '千': 1000,
  '万': 10000,
  '亿': 100000000
};

// 将中文数字转换为阿拉伯数字
export function chineseToArabic(chineseNumber:string) {
  let number = 0;
  let unit = 1;
  for (let i = chineseNumber.length - 1; i >= 0; i--) {
    const char = chineseNumber[i];
    if (chineseNumerals.hasOwnProperty(char)) {
      const digit = (chineseNumerals as any)[char];
      if (digit >= 10) {
        if (digit > unit) {
          unit = digit;
        } else {
          unit *= digit;
        }
      } else {
        number += digit * unit;
      }
    }
  }
  return number;
}

// 将阿拉伯数字转换为中文数字
export function arabicToChinese(arabicNumber:number) {
  if (arabicNumber === 0) {
    return '零';
  }

  let chineseNumber = '';
  const units = ['十', '百', '千', '万', '亿'];
  let unitIndex = 0;

  while (arabicNumber > 0) {
    const digit = arabicNumber % 10;
    if (digit > 0) {
      let chineseDigit;
      if (digit === 2 && units[unitIndex] === '十') {
        chineseDigit = '两';
      } else {
        chineseDigit = chineseNumerals[digit];
      }
      chineseNumber = chineseDigit + units[unitIndex] + chineseNumber;
    }
    arabicNumber = Math.floor(arabicNumber / 10);
    unitIndex++;
  }

  return chineseNumber;
}
