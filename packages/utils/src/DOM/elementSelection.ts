/**
 * [ele description]
 * @param {T extends HTMLElement} ele the target element
 * @param {(text:string,selection:Selection)=>void} cb callback function
 */
export function elementSelection<T extends HTMLElement>(ele: T, cb: (text: string, selection: Selection) => void) {
  if (window) {
    const handler = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 0) {
        const range = document.createRange();
        range.selectNodeContents(ele);
        cb(selection, window.getSelection() as Selection);
      }
    };
    ele.addEventListener("mouseup", handler);
  }
}
