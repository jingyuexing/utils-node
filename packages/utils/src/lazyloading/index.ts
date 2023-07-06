import { isArray } from "@/typeis";

/**
 * @param { T[] | NodeListOf<T>} eles the html element list
 * @param {(entry: T) => void} callback callback function, will be called when the element appears in the viewport
 */
export function lazyLoading<T extends Element>(eles: T[] | NodeListOf<T>, callback: (entry: T) => void) {
   const elements = [...eles];
   if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(entries => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               callback(entry.target as T);
               observer.unobserve(entry.target);
            }
         });
      });
      eles.forEach(value => {
         observer.observe(value);
      });
   } else {
      const isVisiable = (ele: Element) => {
         const elBounding = ele.getBoundingClientRect();
         const windowsHeight = window.innerHeight || document.documentElement.clientHeight;
         const windowsWidth = window.innerWidth || document.documentElement.clientWidth;
         return (
            ((elBounding.top > 0 && elBounding.top <= windowsHeight) ||
               (elBounding.bottom > 0 && elBounding.bottom <= windowsHeight)) &&
            ((elBounding.right > 0 && elBounding.right <= windowsWidth) ||
               (elBounding.left > 0 && elBounding.left <= windowsWidth))
         );
      };
      const func = (e: Event) => {
         if(elements.length === 0){
            document.removeEventListener("scroll",()=>void 0);
            document.removeEventListener("resize",()=>void 0);
         }
         elements.forEach((value,index) => {
            if (isVisiable(value)) {
               callback(value);
               elements.splice(index,1);
            }
         });
      };
      document.addEventListener('scroll', func);
      document.addEventListener('resize', func);
   }
   const append = (ele:T|T[])=>{
      if(isArray(ele)){
         elements.push(...ele);
      }else{
         elements.push(ele);
      }
   }
   return {
      append
   }
}

export function useLazying<T extends Element>(){
   const elements:T[]  = [];
   let append = (ele:T|T[])=> {};
   const lazyloading=(callback:(ele:T)=>void)=>{
      const appendLazying = lazyLoading(elements,callback)
      append = appendLazying.append
   }
   return {
      append,
      lazyloading
   }
}
