export function lazyLoading<T extends Element>(ele: T, callback: (entry:T) => void) {
   if (typeof IntersectionObserver !== "undefined") {
      let observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               callback(entry.target as T)
               observer.unobserve(entry.target)
            }
         })
      })
      observer.observe(ele);
   } else {
      let isVisiable = () => {
         let elBounding = ele.getBoundingClientRect();
         let windowsHeight = window.innerHeight || document.documentElement.clientHeight
         let windowsWidth = window.innerWidth || document.documentElement.clientWidth;
         return elBounding.top >= 0 && elBounding.left >= 0 && elBounding.bottom <= windowsHeight && elBounding.right <= windowsWidth;
      }
      let func = (e: Event) => {
         if (isVisiable()) {
            callback(ele);
         }
      }
      document.addEventListener("scroll", func)
      document.addEventListener("resize", func)
   }
}
