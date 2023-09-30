export function useMouseEnterDirection<T extends HTMLElement>(el:T,cb:(direction:"top"|"bottom"|"left"|"right")=>void){
   const react = el.getBoundingClientRect();
   const theta = Math.atan2(react.height,react.width)
   el.addEventListener("mouseenter",(e)=>{
      const x = e.offsetX - react.width / 2
      const y = react.height / 2 - e.offsetY
      const deg = Math.atan2(x,y);
      if(deg < theta && deg >= -theta){
         cb.call(null,"top")
      }else if(deg >= theta && deg < Math.PI - theta){
         cb.call(null,"right")

      }else if(deg >= Math.PI - theta || deg < -(Math.PI - theta)){
         cb.call(null,"bottom")
      }else {
         cb.call(null,"left")
      }
   })
}
