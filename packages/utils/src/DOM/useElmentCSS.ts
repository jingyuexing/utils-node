export function useElementCSS(el:HTMLElement,style:keyof CSSStyleDeclaration){
   const _style = getComputedStyle(el)
   return _style[style]
}
