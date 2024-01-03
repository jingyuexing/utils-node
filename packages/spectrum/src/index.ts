import { isNone, isNumber } from '@jingyuexing/utils'
const elementLines = {
  'H': [656.3, 486.1, 434.0],
  'He': [587.6, 447.1, 501.6],
  'Li': [670.8, 610.4, 460.3],
  'Be': [313.0, 234.9, 249.0],
  'B': [249.7, 249.8, 206.6],
  'C': [656.3, 486.1, 434.0],
  'N': [654.8, 486.1, 463.0],
  'O': [777.2, 589.0, 464.0],
  'F': [486.1, 434.0, 410.2],
  'Ne': [585.3, 540.1, 530.3],
  'Na': [589.0, 589.6, 588.9],
  'Mg': [517.3, 518.4, 516.7],
  'Al': [396.1, 394.4, 393.3],
  'Si': [390.5, 288.2, 251.6],
  'P': [526.0, 526.5, 527.0],
  'S': [589.4, 546.8, 543.4],
  'Cl': [656.3, 553.6, 551.1],
  'K': [766.5, 769.9, 769.9],
  'Ca': [422.7, 393.4, 396.8],
  'Sc': [424.7, 552.6, 395.4],
  'Ti': [397.0, 334.9, 323.3],
  'V': [437.9, 418.6, 400.9],
  'Cr': [425.4, 427.5, 359.4],
  'Mn': [403.1, 403.1, 403.1],
  'Fe': [371.9, 374.9, 404.6],
  'Co': [361.1, 346.1, 337.6],
  'Ni': [349.0, 341.5, 334.6],
  'Cu': [324.8, 327.4, 327.4],
  'Zn': [334.5, 330.2, 334.5],
  'Ga': [417.2, 403.3, 417.2],
  'Ge': [441.6, 413.2, 441.6],
  'As': [404.7, 406.9, 414.2],
  'Se': [420.3, 413.7, 420.3],
  'Br': [589.9, 588.7, 586.7],
  'Kr': [435.8, 427.2, 430.5],
  'Rb': [780.0, 794.8, 780.0],
  'Sr': [460.7, 421.5, 407.8],
  'Y': [437.0, 437.0, 437.0],
  'Zr': [343.8, 351.1, 346.6],
  'Nb': [391.9, 391.9, 391.9],
  'Mo': [386.4, 386.4, 386.4],
  'Tc': [426.0, 426.0, 426.0],
  'Ru': [386.0, 386.0, 386.0],
  'Rh': [343.5, 343.5, 343.5],
  'Pd': [340.2, 346.5, 340.2],
  'Ag': [328.1, 338.2, 328.1],
  'Cd': [508.6, 643.8, 508.6],
  'In': [451.1, 451.1, 451.1],
  'Sn': [568.4, 568.4, 568.4],
  'Sb': [398.6, 398.6, 398.6],
};
type ElementKind = "H"
    | "He"
    | "Li"
    | "Be"
    | "B"
    | "C"
    | "N"
    | "O"
    | "F"
    | "Ne"
    | "Na"
    | "Mg"
    | "Al"
    | "Si"
    | "P"
    | "S"
    | "Cl"
    | "K"
    | "Ca"
    | "Sc"
    | "Ti"
    | "V"
    | "Cr"
    | "Mn"
    | "Fe"
    | "Co"
    | "Ni"
    | "Cu"
    | "Zn"
    | "Ga"
    | "Ge"
    | "As"
    | "Se"
    | "Br"
    | "Kr"
    | "Rb"
    | "Sr"
    | "Y"
    | "Zr"
    | "Nb"
    | "Mo"
    | "Tc"
    | "Ru"
    | "Rh"
    | "Pd"
    | "Ag"
    | "Cd"
    | "In"
    | "Sn"
    | "Sb"
    | "Te"
    | "I"
    | "Xe"
    | "Cs"
    | "Ba"
    | "La"
    | "Ce"
    | "Pr"
    | "Nd"
    | "Pm"
    | "Sm"
    | "Eu"
    | "Gd"
    | "Tb"
    | "Dy";

type DictEl<Key extends string | number | symbol,V> = {
  [K in Key]:V
}
type ElementLines = DictEl<ElementKind,[number,number,number]>

function analyzeSpectrum(wavelengths:number[], absorbance:number[], elementLines:DictEl<ElementKind,[number,number,number]>) {
  const findClosestIndex = (wavelengths:number[], target:number) =>{
    let minDiff = Infinity;
    let minIndex = 0;

    for (let i = 0; i < wavelengths.length; i++) {
      const diff = Math.abs(wavelengths[i] - target);
      if (diff < minDiff) {
        minDiff = diff;
        minIndex = i;
      }
    }

    return minIndex;
  }

  const matchElements = (wavelengths:number[], absorbance:number[], elementLines:DictEl<ElementKind,[number,number,number]>) => {
    const matchedElements:DictEl<ElementKind,{wavelength:number,absorbance:number}[]> = {} as DictEl<ElementKind,{wavelength:number,absorbance:number}[]>;
    for (const element in elementLines) {
      const lines = elementLines[element as ElementKind];
      const lineMatches:{wavelength:number,absorbance:number}[] = [];

      lines.forEach((line) => {
        const matchIndex = findClosestIndex(wavelengths, line);
        const match = {
          wavelength: wavelengths[matchIndex],
          absorbance: absorbance[matchIndex],
        };
        lineMatches.push(match);
      });

      matchedElements[element as ElementKind] = lineMatches;
    }

    return matchedElements;
  }

  return matchElements(wavelengths, absorbance, elementLines);
}

interface SpectrumData {
  wavelength: number;
  intensity: number;
}

export function parseSpectrumData(data: [number,number][]): SpectrumData[] {
  const spectrumData: SpectrumData[] = [];

  for (const line of data) {
    const [wavelength, intensity] = line;

    if (isNumber(wavelength) && isNumber(intensity)) {
      if (!isNone(wavelength) && !isNone(intensity)) {
        spectrumData.push({ wavelength, intensity });
      }
    }else{
      throw Error("the data should be a number array, type should is [number,number][]")
    }
  }
  return spectrumData;
}
// export function analyzeSpectrum(){
//   const findClosestIndex = () => {

//   }
//   const matchElements = () => {

//   }
// }

// // 示例调用
const wavelengths = [400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500];
const absorbance = [0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02];
const analyzedElements = analyzeSpectrum(wavelengths, absorbance, elementLines as ElementLines);

// // 打印分析结果
for (const element in analyzedElements) {
  const matches = analyzedElements[element as ElementKind];
  console.log(`${element}:`);
  matches.forEach((match) => {
    console.log(' - Wavelength:', match.wavelength, 'Absorbance:', match.absorbance);
  });
}

console.log(parseSpectrumData(["12","33","45"]))

// interface SpectrumData {
//   wavelength: number;
//   intensity: number;
// }

// interface Element {
//   symbol: string;
//   lines: number[];
// }

// export function analyzeSpectrum(spectrumData: SpectrumData[], elements: Element[]): string[] {
//   const findClosestIndex = (target: number, array: number[]): number => {
//     let minDiff = Infinity;
//     let closestIndex = -1;

//     for (let i = 0; i < array.length; i++) {
//       const diff = Math.abs(target - array[i]);
//       if (diff < minDiff) {
//         minDiff = diff;
//         closestIndex = i;
//       }
//     }

//     return closestIndex;
//   };

//   const matchElements = (): string[] => {
//     const matchedElements: string[] = [];

//     for (const spectrum of spectrumData) {
//       const closestIndex = findClosestIndex(spectrum.wavelength, elements[0].lines);
//       const closestWavelength = elements[0].lines[closestIndex];

//       let closestElement = elements[0].symbol;
//       let minDiff = Math.abs(spectrum.wavelength - closestWavelength);

//       for (let i = 1; i < elements.length; i++) {
//         const element = elements[i];
//         const currentIndex = findClosestIndex(spectrum.wavelength, element.lines);
//         const currentWavelength = element.lines[currentIndex];
//         const currentDiff = Math.abs(spectrum.wavelength - currentWavelength);

//         if (currentDiff < minDiff) {
//           minDiff = currentDiff;
//           closestElement = element.symbol;
//         }
//       }

//       matchedElements.push(closestElement);
//     }

//     return matchedElements;
//   };

//   return matchElements();
// }
