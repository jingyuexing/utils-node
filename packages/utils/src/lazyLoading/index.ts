export function lazyLoading<T extends Element>(eles: T[] | NodeListOf<T>, callback: (entry: T) => void) {
   let elementList = [...eles];
   if (typeof IntersectionObserver !== 'undefined') {
      let observer = new IntersectionObserver(entries => {
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
      let isVisiable = (ele: Element) => {
         let elBounding = ele.getBoundingClientRect();
         let windowsHeight = window.innerHeight || document.documentElement.clientHeight;
         let windowsWidth = window.innerWidth || document.documentElement.clientWidth;
         return (
            ((elBounding.top > 0 && elBounding.top <= windowsHeight) ||
               (elBounding.bottom > 0 && elBounding.bottom <= windowsHeight)) &&
            ((elBounding.right > 0 && elBounding.right <= windowsWidth) ||
               (elBounding.left > 0 && elBounding.left <= windowsWidth))
         );
      };
      let func = (e: Event) => {
         elementList.forEach(value => {
            if (isVisiable(value)) {
               callback(value);
               elementList.findIndex((el, idx) => {
                  if (el == value) {
                     delete elementList[idx];
                  }
               });
            }
         });
      };
      document.addEventListener('scroll', func);
      document.addEventListener('resize', func);
   }
}
