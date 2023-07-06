import { isEmpty } from '..';
import { createElement } from './createElement';

interface DOMTree {
   tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
   className?: string;
   style?: Partial<CSSStyleDeclaration>;
   children?: DOMTree[] | string;
}

export function createDOM(config: { root: HTMLElement; tree: DOMTree }): HTMLElement;
export function createDOM(root: HTMLElement, tree: DOMTree): HTMLElement;
export function createDOM(...args: any[]) {
   const tree: DOMTree = args.length === 1 ? args[0].tree : args[1];
   const root: HTMLElement = args.length === 1 ? args[0].root : args[0];
   const style: CSSStyleDeclaration = args.length === 1 ? args[0].style : args[1].style;
   const { tag, className = '', children = '' } = tree;
   let ele: HTMLElement;
   if (className !== '')
      ele = createElement(tag, {
         class: className,
      });
   else ele = createElement(tag);
   if (!isEmpty(style)) {
      for (const key in style) {
         ele.style[key] = style[key];
      }
   }
   if (typeof children === 'string') {
      const text = document.createTextNode(children);
      ele.appendChild(text);
   } else {
      children.forEach(tree => createDOM(ele, tree));
   }
   root.appendChild(ele);
   return root;
}
