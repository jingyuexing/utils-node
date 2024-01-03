interface EventEmiterList {
   start: EventCallback[];
   end: EventCallback[];
   update: EventCallback[];
}
type Dict<K extends string | number | symbol, V> = {
   [P in K]: V;
};
type CSSUnit =
   | 'px'
   | 'rem'
   | '%'
   | 'wh'
   | 'vh'
   | 'vw'
   | 'em'
   | 'deg'
   | 's'
   | 'cm'
   | 'mm'
   | 'Q'
   | 'in'
   | 'pc'
   | 'pt'
   | 'ex'
   | 'ch'
   | 'lh'
   | 'vmin'
   | 'vmax';
type CSSValue = `${number}${CSSUnit}`;
type Props = Partial<Dict<keyof CSSStyleDeclaration, string[] | number | number[]|object>>;

type Values = Dict<keyof CSSStyleDeclaration, number | CSSValue>;
type EventCallback = (values: Partial<Values>) => void;

interface EasingFunctions {
   linear(x: number): number;
   easeInQuad(x: number): number;
   easeOutQuad(x: number): number;
   easeInOutQuad(x: number): number;
   easeInCubic(x: number): number;
   easeOutCubic(x: number): number;
   easeInOutCubic(x: number): number;
   easeInQuart(x: number): number;
   easeOutQuart(x: number): number;
   easeInOutQuart(x: number): number;
   easeInQuint(x: number): number;
   easeOutQuint(x: number): number;
   easeInOutQuint(x: number): number;
   elasticity(x:number):number;
}

function guessUnit(key: keyof CSSStyleDeclaration) {
   const map = new Map<keyof CSSStyleDeclaration, CSSUnit>();
   map.set('fontSize', 'px');
   map.set('width', 'px');
   map.set('maxWidth', 'px');
   map.set('minWidth', 'px');
   map.set('maxHeight', 'px');
   map.set('minHeight', 'px');
   map.set('height', 'px');
   map.set('left', 'px');
   map.set('right', 'px');
   map.set('top', 'px');
   return map.get(key);
}

class ZenAnimation {
   target: HTMLElement;
   props: Props;
   duration: number;
   easing: keyof EasingFunctions;
   isPlaying: boolean = false;
   startTime: number = 0;
   endTime: number = 0;
   currentFrame: number = 0;
   requestId: number = 0;
   callbacks: EventEmiterList;
   easingFunctions: EasingFunctions = {
      linear: function (t) {
         return t;
      },
      easeInQuad: function (t) {
         return t * t;
      },
      easeOutQuad: function (t) {
         return t * (2 - t);
      },
      easeInOutQuad: function (t) {
         return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function (t) {
         return t * t * t;
      },
      easeOutCubic: function (t) {
         return --t * t * t + 1;
      },
      easeInOutCubic: function (t) {
         return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function (t) {
         return t * t * t * t;
      },
      easeOutQuart: function (t) {
         return 1 - --t * t * t * t;
      },
      easeInOutQuart: function (t) {
         return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function (t) {
         return t * t * t * t * t;
      },
      easeOutQuint: function (t) {
         return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function (t) {
         return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      },
      elasticity:function(x){
         return Math.pow(-0.5*Math.E,-6*x)*(Math.pow(-2*Math.E,6*x)+Math.sin(12*x)+2*Math.cos(12*x))
      }
   };
   /**
    * [constructor description]
    * @param {HTMLElement |string} target the animation element or element id
    * @param {Partial<Dict<keyof CSSStyleDeclaration, string[] | number | number[]>>} props animation propertys like font-size, height etc.
    * @param {number}  duration   duration time unit is ms,default value is `1000`
    * @param {keyof EasingFunctions} easing        default value is `"linear"`
    */
   constructor(
      target: HTMLElement | string,
      props: Props,
      duration: number = 1000,
      easing: keyof EasingFunctions = 'linear',
   ) {
      if (typeof target === 'string') {
         this.target = document.getElementById(target)!;
      } else {
         this.target = target;
      }
      this.props = props;
      this.duration = duration;
      this.easing = easing;
      this.callbacks = {
         start: [],
         end: [],
         update: [],
      };
   }
   /**
    * [start description]
    */
   start() {
      if (this.isPlaying) {return}
      this.isPlaying = true;
      this.startTime = performance.now();
      this.endTime = this.startTime + this.duration;
      this.currentFrame = this.getCurrentFrame();
      this.requestId = requestAnimationFrame(this.animate.bind(this));
      this.trigger('start');
   }
   /**
    * [pause description]
    */
   pause() {
      if (!this.isPlaying) {return}
      cancelAnimationFrame(this.requestId);
      this.isPlaying = false;
      this.trigger('end');
   }
   /**
    * [animate description]
    */
   animate() {
      const now = performance.now();
      let progress = (now - this.startTime) / this.duration;
      progress = Math.min(Math.max(progress, 0), 1);
      const value = this.getAnimationFrames(progress);
      this.setStyle(value);
      this.trigger('update', value);
      if (now < this.endTime) {
         this.requestId = requestAnimationFrame(this.animate.bind(this));
      } else {
         this.isPlaying = false;
         this.trigger('end');
      }
   }
   /**
    * [trigger description]
    * @param {keyof EventEmiterList} eventName [description]
    * @param {Partial<Values>}    value         [description]
    */
   trigger(eventName: keyof EventEmiterList, value: Partial<Values> = {}) {
      const callbackList = this.callbacks[eventName];
      for (let i = 0; i < callbackList.length; i++) {
         callbackList[i].call(this, value);
      }
   }
   /**
    * [on description]
    * @param {keyof      EventEmiterList} eventType     [description]
    * @param {EventCallback} callback          [description]
    */
   on(eventType: keyof EventEmiterList, callback: EventCallback) {
      if (this.callbacks[eventType]) {
         this.callbacks[eventType].push(callback);
      }
   }
   /**
    * [setStyle description]
    * @param {Partial<Values>} value [description]
    */
   setStyle(value: Partial<Values>): void {
      for (const prop in value) {
         this.target.style[prop] = value[prop] + guessUnit(prop as keyof CSSStyleDeclaration);
      }
   }
   /**
    * [getAnimationFrames description]
    * @param {number} progress [description]
    */
   getAnimationFrames(progress: number) {
      let value: Partial<Values> = {};
      for (let propKey in this.props) {
         let propValue = this.props[propKey] as number | [number,number]|object;
         if (typeof propValue === 'number') {
            value[propKey] = propValue * progress;
         } else if (Array.isArray(propValue)) {
            let [start, end] = propValue as [number, number];
            let deltaVal = end - start;
            value[propKey] = start + deltaVal * this.easingFunctions[this.easing](progress);
         } else if (typeof propValue === 'object') {
            value[propKey] = 0;
            for (let key in propValue) {
               let [start, end] = propValue[key] as [number, number];
               let deltaVal = end - start;
               value[propKey][key] = start + deltaVal * this.easingFunctions[this.easing](progress);
            }
         }
      }
      return value;
   }
   /**
    * [getCurrentFrame description]
    * @return {number} [description]
    */
   getCurrentFrame(): number {
      let now = performance.now();
      return (now - this.startTime) / this.duration;
   }
   /**
    * [zenAnimation description]
    * @type { Dict<K extends string | number | symbol, V> = {[P in K]: V} }
    * @param {HTMLElement |string} target the animation element or element id
    * @param {Partial<Dict<keyof CSSStyleDeclaration, string[] | number | number[]>>} props animation propertys like font-size, height etc.
    * @param {number}  duration   duration time unit is ms,default value is `1000`
    * @param {keyof EasingFunctions} easing        default value is `"linear"`
    * @return {ZenAnimation} the `ZenAnimation` instance
    */
   static zenAnimation(
      target: HTMLElement | string,
      props: Props,
      duration: number = 1000,
      easing: keyof EasingFunctions = 'linear',
   ): ZenAnimation {
      return new ZenAnimation(target, props, duration, easing);
   }
}
