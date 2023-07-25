import { entries } from '../object';
export function fingerprint(): string {
   const fP: string = '';
   // 获取用户代理信息
   if (typeof window !== "undefined"  &&  typeof navigator !== "undefined") {
      const getUserAgent = () => {
         return `agent:${navigator.userAgent}`;
      };
      const getBroswerScreen = () => {
         const info = {
            width: window.screen.width,
            height: window.screen.height,
            solorDepth: window.screen.colorDepth,
         };
         return entries(info)
            .map(([key, value]) => [key, value].join(':'))
            .join(';');
      };

      const plugins: string[] = [];
      const getPlugins = () => {
         // 获取插件信息
         for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push(navigator.plugins[i].name);
         }
         return `plugins:${plugins.join(',')}`;
      };
      const getFonts = () => {
         const fonts: string[] = [];
         // 获取字体信息
         const testText = 'abcdefghijklmnopqrstuvwxyz0123456789';
         const testHeight = 100;

         // 循环测试常见字体
         const fontFamilies = [
            'Arial',
            'Helvetica',
            'Times New Roman',
            'Times',
            'Courier New',
            'Courier',
            'Verdana',
            'Georgia',
            'Palatino',
            'Garamond',
            'Bookman',
            'Comic Sans MS',
            'Trebuchet MS',
            'Arial Black',
            'Impact',
         ];
         for (let i = 0; i < fontFamilies.length; i++) {
            const testFont = fontFamilies[i];
            const span = document.createElement('span');
            span.innerHTML = testText;
            span.style.fontFamily = testFont;
            span.style.fontSize = '72px';
            span.style.position = 'absolute';
            span.style.top = '-9999px';
            document.body.appendChild(span);
            const height = span.offsetHeight;
            document.body.removeChild(span);
            if (height >= testHeight) {
               fonts.push(testFont);
            }
         }
         return `fonts:${fonts.join(',')}`;
      };
      const fingerString = [getFonts(), getPlugins(), getBroswerScreen(),getUserAgent()].join(';');
      return btoa(fingerString);
   }
   return fP;
}
