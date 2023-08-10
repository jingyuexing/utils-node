export function useReady() {
  const eventMap: {
    [key in DocumentReadyState]: Function[];
  } = {
    complete: [],
    interactive: [],
    loading: [],
  };
  const onComplete = (fn: Function) => {
    eventMap["complete"].push(fn);
  };
  const onInteractive = (fn: Function) => {
    eventMap["interactive"].push(fn);
  };
  const onLoading = (fn: Function) => {
    eventMap["loading"].push(fn);
  };
  document.onreadystatechange = function () {
    for (const cb of eventMap[document.readyState]) {
      cb();
    }
  };
  return {
    onComplete,
    onInteractive,
    onLoading,
  };
}
