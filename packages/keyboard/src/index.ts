export function bind(keyCombo: string, callback: (e: KeyboardEvent) => void) {
  const [mainKey, ...modifierKeys] = keyCombo.split("+").map(key => key.toLowerCase());
  const keysPressed = new Set();

  document.addEventListener("keydown", (event) => {
    keysPressed.add(event.key.toLowerCase());

    const allModifiersPressed = modifierKeys.every(modifierKey => keysPressed.has(modifierKey));
    if (keysPressed.has(mainKey) && allModifiersPressed) {
      event.preventDefault();
      callback(event);
    }
  });

  document.addEventListener("keyup", (event) => {
    keysPressed.delete(event.key.toLowerCase());
  });
}

export function keyCombination(keyCombo: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    bind(keyCombo, target[propertyKey]);
  };
}

type ClssConstructor = { new(...args: any[]): {} } & Function;
export function Combe(shortcut: string): ClassDecorator {
  // 返回一个装饰器函数
  return function (target: any) {
    const [mainKey, ...modifierKeys] = shortcut.split('+');
    const keysPressed: any = {};
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;

      const allModifiersPressed = modifierKeys.every(modifierKey => keysPressed[modifierKey]);
      if (keysPressed[mainKey] && allModifiersPressed) {
        event.preventDefault();

        // 创建类的实例并调用指定方法
        const instance = new target();
        if (typeof instance.handleKeyCombe === 'function') {
          instance.handleKeyCombe();
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      keysPressed[event.key] = false;
    });
  }
}

export function DOMKeys(el: HTMLElement, keyCombo: `${string}+${string}`|`${string}+${string}+${string}`, cb: (event: Event) => void) {
  const [mainKey, ...modifierKeys] = keyCombo.split('+');
  const keysPressed = new Set();
  el.addEventListener('keydown', (event) => {
    keysPressed.add(event.key.toLowerCase());
    const allModifiersPressed = modifierKeys.every(modifierKey => keysPressed.has(modifierKey));
    if (keysPressed.has(mainKey) && allModifiersPressed) {
      event.preventDefault();
      cb(event);
    }
  })
}
