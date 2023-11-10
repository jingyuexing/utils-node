/**
 * @DOM
 * [datas description]
 * @type {T[]}
 */
export function useTask<T>(datas: T[], cb: (task: T[]) => void, chunk = 10) {
   const _data: T[] = datas;
   if (_data.length === 0) {
      return;
   }
   let i = 0;
   function _run() {
      if (i === _data.length) {
         return;
      }
      requestIdleCallback(deadline => {
         while (deadline.timeRemaining() && i < _data.length) {
            let _end = i + chunk;
            if (_end > _data.length) {
               _end = _data.length - 1;
            }
            cb(_data.slice(i, _end));
            i += chunk;
         }
         _run();
      });
   }
   _run();
}
