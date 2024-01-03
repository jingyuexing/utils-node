export function DOMKeys(
   el: HTMLElement | null,
   keyCombo: `${string}+${string}` | `${string}+${string}+${string}`,
   cb: (event: KeyboardEvent) => void,
) {
   const [mainKey, ...modifierKeys] = keyCombo.split('+');
   const keysPressed = new Set();
   if (!el) {
      el = document.body;
      console.warn('You need to specify a DOM object for event binding, the current binding is body');
   }
   el.addEventListener('keydown', event => {
      keysPressed.add(event.key.toLowerCase());
      const allModifiersPressed = modifierKeys.every(modifierKey => keysPressed.has(modifierKey));
      if (keysPressed.has(mainKey) && allModifiersPressed) {
         event.preventDefault();
         cb(event);
      }
   });
}
