import { IShape } from "../shape/shape";

export const task: IShape[] = [];
declare let __CANVAS_CONTEXT__: CanvasRenderingContext2D | null;
export function render(el: HTMLCanvasElement) {
  const _ctx = el.getContext("2d");
  if (_ctx) {
    __CANVAS_CONTEXT__ = el.getContext("2d");
  } else {
    __CANVAS_CONTEXT__ = null;
  }
}

export function useContext() {
  return __CANVAS_CONTEXT__;
}

export interface Config{
   render:boolean
   request?:boolean
}

export const __RENDER__ = new Proxy<Config>(
  {
    render: true,
    request: false
  },
  {
    get(obj, p:keyof Config) {
      return obj[p]
    },
    set(obj, p) {
      if (p === "render" && obj[p]) {
        requestAnimationFrame(() => {
          const renderContext = useContext();
          for (const shape of task) {
            if (renderContext) {
              shape.draw(renderContext);
            }
          }
        });
      }
      return true;
    },
  },
);

export function addRenderTask(shape: IShape | null) {
  if (shape) {
    task.push(shape);
  } else {
    console.warn("shape should be not empty value");
  }
}
