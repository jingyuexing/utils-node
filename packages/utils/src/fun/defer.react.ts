/**
 * [useDefer description]
 * 当framenums渲染帧数小于指定帧数 则执行defer定义的回调函数,反之不执行
 * @param {number} framenums 渲染帧数
 */
function useDefer(framenums:number) {
  const frameCount = { value: 0 };
  let _callback:((...args:any[])=>void)|null = null
  let animationFrameId: number;
  const defer = (callback:(...args:any[])=>void) => {
   _callback = callback
  };

  const renderFrame:FrameRequestCallback = (deadline) => {
    if(deadline){}
    frameCount.value++;
    if (frameCount.value <= framenums && _callback) {
      _callback(frameCount,animationFrameId);
     animationFrameId = requestAnimationFrame(renderFrame);
    }else{
      cancelAnimationFrame(animationFrameId)
    }
  };

  animationFrameId = requestAnimationFrame(renderFrame);
  return {
    defer,
  };
}
