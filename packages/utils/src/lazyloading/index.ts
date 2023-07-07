import { isArray } from '../typeis';

/**
 * @param { T[] | NodeListOf<T>} eles the html element list
 * @param {(entry: T) => void} callback callback function, will be called when the element appears in the viewport
 */
export function lazyLoading<T extends Element>(eles: T[] | NodeListOf<T>, callback: (entry: T) => void) {
   const elements: T[] = [];
   let callback_: (entry: T) => void = callback;
   let observer: IntersectionObserver | null = null;
   const appendElement = (ele: T | T[]) => {
      const begin = elements.length;
      if (isArray(ele)) {
         elements.push(...ele);
      } else {
         elements.push(ele);
      }
      if (observer) {
         for (let i = begin; i < elements.length; i++) {
            observer.observe(elements[i]);
         }
      }
   };
   const setCallback = (callback: (entry: T) => void) => {
      callback_ = callback;
   };
   const removeElement = (ele: T) => {
      const index = elements.indexOf(ele);
      if (index !== -1) {
         elements.splice(index, 1);
      }
   };
   appendElement([...eles]);
   if (typeof IntersectionObserver !== 'undefined') {
      if (!observer) {
         observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
               if (entry.isIntersecting) {
                  callback_(entry.target as T);
                  observer?.unobserve(entry.target);
                  removeElement(entry.target as T);
               }
            });
         });
         elements.forEach(value => {
            observer?.observe(value);
         });
      }
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
         if (elements.length === 0) {
            document.removeEventListener('scroll', () => void 0);
            document.removeEventListener('resize', () => void 0);
         }
         elements.forEach((value, index) => {
            if (isVisiable(value)) {
               callback_(value);
               removeElement(value);
            }
         });
      };
      document.addEventListener('scroll', func);
      document.addEventListener('resize', func);
   }
   return {
      appendElement,
      removeElement,
      setCallback,
   };
}
