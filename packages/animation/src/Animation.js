"use strict";
function guessUnit(key) {
    var map = new Map();
    map.set("fontSize", "px");
    map.set("width", "px");
    map.set("maxWidth", "px");
    map.set("minWidth", "px");
    map.set("maxHeight", "px");
    map.set("minHeight", "px");
    map.set("height", "px");
    map.set("left", "px");
    map.set("right", "px");
    map.set("top", "px");
    return map.get(key);
}
var ZenAnimation = /** @class */ (function () {
    /**
     * [constructor description]
     * @param {HTMLElement |string} target the animation element or element id
     * @param {Partial<Dict<keyof CSSStyleDeclaration, string[] | number | number[]>>} props animation propertys like font-size, height etc.
     * @param {number}  duration   duration time unit is ms,default value is `1000`
     * @param {keyof EasingFunctions} easing        default value is `"linear"`
     */
    function ZenAnimation(target, props, duration, easing) {
        this.isPlaying = false;
        this.startTime = 0;
        this.endTime = 0;
        this.currentFrame = 0;
        this.requestId = 0;
        this.easingFunctions = {
            linear: function (t) { return t; },
            easeInQuad: function (t) { return t * t; },
            easeOutQuad: function (t) { return t * (2 - t); },
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            easeInCubic: function (t) { return t * t * t; },
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            easeInQuart: function (t) { return t * t * t * t; },
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            easeInQuint: function (t) { return t * t * t * t * t; },
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
        if (typeof target === "string") {
            this.target = document.getElementById(target);
        }
        else {
            this.target = target;
        }
        this.props = props;
        this.duration = duration || 1000;
        this.easing = easing || "linear";
        this.callbacks = {
            start: [],
            end: [],
            update: []
        };
    }
    /**
     * [start description]
     */
    ZenAnimation.prototype.start = function () {
        if (this.isPlaying)
            return;
        this.isPlaying = true;
        this.startTime = performance.now();
        this.endTime = this.startTime + this.duration;
        this.currentFrame = this.getCurrentFrame();
        this.requestId = requestAnimationFrame(this.animate.bind(this));
        this.trigger("start");
    };
    /**
     * [pause description]
     */
    ZenAnimation.prototype.pause = function () {
        if (!this.isPlaying)
            return;
        cancelAnimationFrame(this.requestId);
        this.isPlaying = false;
        this.trigger("end");
    };
    /**
     * [animate description]
     */
    ZenAnimation.prototype.animate = function () {
        var now = performance.now();
        var progress = (now - this.startTime) / this.duration;
        progress = Math.min(Math.max(progress, 0), 1);
        var value = this.getAnimationFrames(progress);
        this.setStyle(value);
        this.trigger("update", value);
        if (now < this.endTime) {
            this.requestId = requestAnimationFrame(this.animate.bind(this));
        }
        else {
            this.isPlaying = false;
            this.trigger("end");
        }
    };
    /**
     * [trigger description]
     * @param {keyof EventEmiterList} eventName [description]
     * @param {Partial<Values> =                 {}}    value         [description]
     */
    ZenAnimation.prototype.trigger = function (eventName, value) {
        if (value === void 0) { value = {}; }
        var callbackList = this.callbacks[eventName];
        for (var i = 0; i < callbackList.length; i++) {
            callbackList[i].call(this, value);
        }
    };
    /**
     * [on description]
     * @param {keyof      EventEmiterList} eventType     [description]
     * @param {EventCallback} callback          [description]
     */
    ZenAnimation.prototype.on = function (eventType, callback) {
        if (this.callbacks[eventType]) {
            this.callbacks[eventType].push(callback);
        }
    };
    /**
     * [setStyle description]
     * @param {Partial<Values>} value [description]
     */
    ZenAnimation.prototype.setStyle = function (value) {
        for (var prop in value) {
            this.target.style[prop] = value[prop] + guessUnit(prop);
        }
    };
    /**
     * [getAnimationFrames description]
     * @param {number} progress [description]
     */
    ZenAnimation.prototype.getAnimationFrames = function (progress) {
        var value = {};
        for (var propKey in this.props) {
            var propValue = this.props[propKey];
            if (typeof propValue === "number") {
                value[propKey] = propValue * progress;
            }
            else if (Array.isArray(propValue)) {
                var _a = propValue, start = _a[0], end = _a[1];
                var deltaVal = end - start;
                value[propKey] = start + deltaVal * this.easingFunctions[this.easing](progress);
            }
        }
        return value;
    };
    /**
     * [getCurrentFrame description]
     * @return {number} [description]
     */
    ZenAnimation.prototype.getCurrentFrame = function () {
        var now = performance.now();
        return (now - this.startTime) / this.duration;
    };
    /**
     * [zenAnimation description]
     * @type { Dict<K extends string | number | symbol, V> = {[P in K]: V} }
     * @param {HTMLElement |string} target the animation element or element id
     * @param {Partial<Dict<keyof CSSStyleDeclaration, string[] | number | number[]>>} props animation propertys like font-size, height etc.
     * @param {number}  duration   duration time unit is ms,default value is `1000`
     * @param {keyof EasingFunctions} easing        default value is `"linear"`
     * @return {ZenAnimation} the `ZenAnimation` instance
     */
    ZenAnimation.zenAnimation = function (target, props, duration, easing) {
        if (duration === void 0) { duration = 1000; }
        if (easing === void 0) { easing = "linear"; }
        return new ZenAnimation(target, props, duration, easing);
    };
    return ZenAnimation;
}());
