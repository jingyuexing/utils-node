export function useFreezeDOM<T extends HTMLElement>(el: T) {
  const _backupStyles = getComputedStyle(el);
  let _el: T;
  let _callback: (entry: MutationRecord, style: typeof _backupStyles) => void;
  const _mutal = new MutationObserver((entries) => {
    for (const item of entries) {
      _callback(item, _backupStyles);
    }
  });
  const updateElement = (ele: T) => {
    _el = ele;
  };
  const updateCallback = (callback: (entry: MutationRecord) => void) => {
    _callback = callback;
  };
  _mutal.observe(_el as Node, {
    childList: true,
    attributes: true,
    subtree: true,
  });
  const NonePrototypeObject = Object.create(null);
  NonePrototypeObject["updateElement"] = updateElement;
  NonePrototypeObject["updateCallback"] = updateCallback;
  return NonePrototypeObject;
}
