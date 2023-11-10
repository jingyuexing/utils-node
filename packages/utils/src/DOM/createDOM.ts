import { isEmpty } from '../typeis';
import { createElement } from './createElement';

interface DOMTree {
   tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
   className?: string;
   attributes?: Record<string, any>;
   style?: Partial<CSSStyleDeclaration>;
   children?: DOMTree[] | string | number;
}
type Func = (...args: any[]) => void;
type Hook = (cb: Func) => void;
type ReturnHooks = {
   onMounted: Hook;
   onMountedBefore: Hook;
   onMountedAfter: Hook;
   onAttributesLoadBefore: Hook;
   onAttributesLoaded: Hook;
};

const useHooks = () => {
   const emits: Record<keyof ReturnHooks, Func[]> = {
      onMounted: [],
      onAttributesLoaded: [],
      onMountedAfter: [],
      onMountedBefore: [],
      onAttributesLoadBefore: [],
   };
   const onMounted = (cb: Func) => {
      emits['onMounted'].push(cb);
   };
   const onMountedBefore = (cb: Func) => {
      emits['onMountedBefore'].push(cb);
   };
   const onMountedAfter = (cb: Func) => {
      emits['onMountedAfter'].push(cb);
   };
   const onAttributesLoadBefore = (cb: Func) => {
      emits['onAttributesLoadBefore'].push(cb);
   };
   const onAttributesLoaded = (cb: Func) => {
      emits['onAttributesLoaded'].push(cb);
   };
   const excuteEmits = (event: keyof typeof emits, ...args: any[]) => {
      for (let i = 0; i < emits[event].length; i++) {
         emits[event][i](...args);
      }
   };
   return {
      onMounted,
      onMountedBefore,
      onMountedAfter,
      onAttributesLoadBefore,
      onAttributesLoaded,
      excuteEmits,
   };
};
const hook = useHooks();
/**
 * @DOM
 * @param {DOMTree }} config [description]
 */
export function createDOM(config: { root: HTMLElement; tree: DOMTree }): [HTMLElement, ReturnHooks];
/**
 * @DOM
 * @param {DOMTree }} config [description]
 */
export function createDOM(root: HTMLElement, tree: DOMTree): [HTMLElement, ReturnHooks];
/**
 * /**
 * @DOM
 * @param {any[]} ...args [description]
 */
export function createDOM(...args: any[]) {
   const tree: DOMTree = args.length === 1 ? args[0].tree : args[1];
   const root: HTMLElement = args.length === 1 ? args[0].root : args[0];
   const style: CSSStyleDeclaration = args.length === 1 ? args[0].style : args[1].style;
   const { tag, className = '', children = '', attributes = {} } = tree;
   let ele: HTMLElement;
   hook.excuteEmits('onAttributesLoadBefore', attributes, undefined);
   if (className !== '') {
      ele = createElement(tag, {
         class: className,
         ...attributes,
      });
   } else {
      ele = createElement(tag, {
         ...attributes,
      });
   }
   hook.excuteEmits('onAttributesLoaded', attributes, ele);
   if (!isEmpty(style)) {
      for (const key in style) {
         ele.style[key] = style[key];
      }
   }
   if (typeof children === 'string' || typeof children === 'number') {
      const text = document.createTextNode(`${children}`);
      ele.appendChild(text);
   } else {
      children.forEach(tree => createDOM(ele, tree));
   }
   hook.excuteEmits('onMountedBefore', ele);
   root.appendChild(ele);
   hook.excuteEmits('onMounted', ele);
   return [root, {}];
}

export const onMounted = hook.onMounted;
export const onMountedBefore = hook.onMountedBefore;
export const onMountedAfter = hook.onMountedAfter;
export const onAttributesLoadBefore = hook.onAttributesLoadBefore;
export const onAttributesLoaded = hook.onAttributesLoaded;
