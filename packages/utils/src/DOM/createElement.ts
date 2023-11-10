import { AnyToString } from "../string";

/**
 * @DOM
 * [element description]
 * @type {K}
 */
export function createElement<K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>(
   element: K,
   attributes?: Record<string, string>,
) {
   const ele = document.createElement(element);
   if (attributes) {
      Object.keys(attributes).forEach(key => {
         ele.setAttribute(key, `${AnyToString(attributes[key])}`);
      });
   }
   return ele;
}
