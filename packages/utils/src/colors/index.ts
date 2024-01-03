export function hlsToRgb(h: number, l: number, s: number): [number, number, number] {
   h /= 360;
   s /= 100;
   l /= 100;

   let r;
   let g;
   let b;

   if (s === 0) {
      r = g = b = l;
   } else {
      const hueToRgb = (p: number, q: number, t: number) => {
         if (t < 0) t += 1;
         if (t > 1) t -= 1;
         if (t < 1 / 6) return p + (q - p) * 6 * t;
         if (t < 1 / 2) return q;
         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
         return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
   }

   return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function hexToHsl(hexColor: string): [h:number, s:number, l:number] {
   // 将六位十六进制数转换为RGB颜色值
   const red = parseInt(hexColor.substring(0, 2), 16) / 255.0;
   const green = parseInt(hexColor.substring(2, 4), 16) / 255.0;
   const blue = parseInt(hexColor.substring(4, 6), 16) / 255.0;

   // 计算HSL颜色值
   const cmax = Math.max(red, green, blue);
   const cmin = Math.min(red, green, blue);
   const delta = cmax - cmin;

   let hue: number;
   if (delta === 0) {
      hue = 0;
   } else if (cmax === red) {
      hue = ((green - blue) / delta) % 6;
   } else if (cmax === green) {
      hue = (blue - red) / delta + 2;
   } else {
      hue = (red - green) / delta + 4;
   }

   hue = Math.round(hue * 60);
   if (hue < 0) {
      hue += 360;
   }

   const lightness = (cmax + cmin) / 2;

   let saturation: number;
   if (delta === 0) {
      saturation = 0;
   } else {
      saturation = delta / (1 - Math.abs(2 * lightness - 1));
   }

   saturation = Math.round(saturation * 100);
   const hslColor: [number, number, number] = [hue, saturation, Math.round(lightness * 100)];

   return hslColor;
}

export function randomColor() {
   return Math.random().toString(16).slice(2, 8);
}

export function getContrastColor(hexColor: string): string {
   // 将颜色值转换为HSL颜色值
   const [h, s, l] = hexToHsl(hexColor);

   // 计算对比色的色相值
   const contrastHue = (h + 180) % 360;

   // 将对比色的HSL颜色值转换为六位十六进制数
   const [r, g, b] = hlsToRgb(contrastHue / 360, l / 100, s / 100);
   return rgbToHex(r,g,b)
}


export function hlsToHex(h:number,s:number,l:number){
   const complementaryHue = (h + 180) % 360;
   const [r, g, b] = hlsToRgb(complementaryHue / 360, l / 100, s / 100);
   return rgbToHex(r,g,b)
}

export function rgbToHex(r:number,g:number,b:number){
   return `#${[r, g, b]
         .map(c =>
            Math.round(c * 255)
               .toString(16)
               .padStart(2, '0'),
         )
         .join('')}`;

}

export function isValidHexColor(hexColor: string): boolean {
   return /^#[0-9a-fA-F]{6}$/.test(hexColor);
}

function getValidHexColor(hexColor: string): string | '' {
   return isValidHexColor(hexColor) ? hexColor : '';
}

export function getContrastColorFromHex(hexColor: string): string | null {
   const validHexColor = getValidHexColor(hexColor);
   return validHexColor ? getContrastColor(validHexColor) : null;
}

export function getNearbyColor(hexColor: string, degree: number): string | null {
   const validHexColor = getValidHexColor(hexColor);
   if (!validHexColor) {
      return null;
   }

   const [h, s, l] = hexToHsl(validHexColor);
   const nearbyHue = (h + degree) % 360;
   const [r, g, b] = hlsToRgb(nearbyHue / 360, l / 100, s / 100);
   return rgbToHex(r,g,b)
}

export function getComplementaryColor(hexColor: string): string | null {
   const validHexColor = getValidHexColor(hexColor);
   if (!validHexColor) {
      return null;
   }

   const [h, s, l] = hexToHsl(validHexColor);
   const complementaryHue = (h + 180) % 360;
   const [r, g, b] = hlsToRgb(complementaryHue / 360, l / 100, s / 100);
   return rgbToHex(r,g,b)
}

/**
 * 生成明度逐渐递减的颜色
 * @param  {string}   hexColor  base color
 * @param  {number}   numColors generator colors
 * @param  {number}   step      every single step
 * @return {string[]}           color list
 */
export function generateGradientColors(hexColor: string, numColors: number, step: number): string[] {
   const validHexColor = getValidHexColor(hexColor);
   if (!validHexColor) {
      return [];
   }

   const [h, s, l] = hexToHsl(validHexColor);
   const colors = [];

   for (let i = 0; i < numColors; i++) {
      const newL = l - i * step;
      if (newL < 0) {
         break;
      }
      const [r, g, b] = hlsToRgb(h / 360, s / 100, newL / 100);
      colors.push(rgbToHex(r,g,b));
   }

   return colors;
}
