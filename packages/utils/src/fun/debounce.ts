/**
 * Creates a debounced function that executes the callback only once within a specified duration.
 * @param {(...args: P[]) => T} callback - The callback function to execute.
 * @param {number} duration - The duration (in milliseconds) within which the callback function should only be executed once. Default value is 3000 milliseconds.
 * @returns {(...args: any[]) => T} - The wrapped debounced function.
 */
export function debounce<T,P extends object & {}>(callback: (...args: P[]) => T, duration = 3000) {
  let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
  let enable = true;
  let result: T | undefined;

  const wrapper = function (...args: any[]) {
    if (enable) {
      clearTimeout(timeout); // 清除之前的定时器
      result = callback(...args);
      enable = false;
      timeout = setTimeout(() => {
        enable = true;
      }, duration);
    }
    return result;
  };

  return wrapper;
}
