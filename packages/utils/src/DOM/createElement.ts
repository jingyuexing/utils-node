export function createElement<K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>(element: K, attributes?: Record<string, string>) {
   let ele = document.createElement(element)
   if (attributes) {
      Object.keys(attributes).forEach((key) => {
         ele.setAttribute(key, attributes[key])
      })
   }
   return ele
}
