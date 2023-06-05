import { createElement } from './createElement';

interface DOMTree {
   tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
   className?: string;
   children: DOMTree[] | string;
}

export function createDOM(config: { root: HTMLElement; tree: DOMTree }): HTMLElement;
export function createDOM(root: HTMLElement, tree: DOMTree): HTMLElement;
export function createDOM(...args: any[]) {
   let tree: DOMTree = args.length === 1 ? args[0].tree : args[1];
   let root: HTMLElement = args.length === 1 ? args[0].root : args[0];
   let { tag, className = '', children = '' } = tree;
   let ele: HTMLElement;
   if (className !== '')
      ele = createElement(tag, {
         class: className,
      });
   else ele = createElement(tag);
   if (typeof children === 'string') {
      let text = document.createTextNode(children);
      ele.appendChild(text);
   } else {
      children.forEach(tree => createDOM(ele, tree));
   }
   root.appendChild(ele);
   return root;
}
