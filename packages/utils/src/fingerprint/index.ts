import { entries } from '@/object';
import { isUndefined } from '..';
export function fingerprint(): string {
   let FP: string = '';
   // 获取用户代理信息
   if (!isUndefined(window)  &&  !isUndefined(navigator)) {
      let getUserAgent = () => {
         return `agent:${navigator.userAgent}`;
      };
      let getBroswerScreen = () => {
         let info = {
            width: window.screen.width,
            height: window.screen.height,
            solorDepth: window.screen.colorDepth,
         };
         return entries(info)
            .map(([key, value]) => [key, value].join(':'))
            .join(';');
      };

      let plugins: string[] = [];
      let getPlugins = () => {
         // 获取插件信息
         for (var i = 0; i < navigator.plugins.length; i++) {
            plugins.push(navigator.plugins[i].name);
         }
         return `plugins:${plugins.join(',')}`;
      };
      let getFonts = () => {
         let fonts: string[] = [];
         // 获取字体信息
         var testText = 'abcdefghijklmnopqrstuvwxyz0123456789';
         var testHeight = 100;

         // 循环测试常见字体
         var fontFamilies = [
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
         for (var i = 0; i < fontFamilies.length; i++) {
            var testFont = fontFamilies[i];
            var span = document.createElement('span');
            span.innerHTML = testText;
            span.style.fontFamily = testFont;
            span.style.fontSize = '72px';
            span.style.position = 'absolute';
            span.style.top = '-9999px';
            document.body.appendChild(span);
            var height = span.offsetHeight;
            document.body.removeChild(span);
            if (height >= testHeight) {
               fonts.push(testFont);
            }
         }
         return `fonts:${fonts.join(',')}`;
      };
      return [getFonts(), getPlugins(), getBroswerScreen(),getUserAgent()].join(';');
   }
   return FP;
}
