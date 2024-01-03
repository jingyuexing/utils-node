export function useToggle<T extends (number|string)[] | boolean>(value:T) {
  const normalized = Array.isArray(value) ? value : [false, true];
  let index = 0;
  let toggleValue:T[number] | boolean = normalized[index]
  const toggle = () => {
    index = (index + 1) % normalized.length;
    toggleValue = normalized[index];
  };

  return {
    toggle,
    value:()=>toggleValue
  };
}
