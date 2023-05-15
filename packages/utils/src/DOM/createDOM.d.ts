interface DOMTree {
   tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
   className?: string;
   children: DOMTree[] | string;
}
export declare function createDOM(root: HTMLElement, tree: DOMTree): HTMLElement;
export {};
