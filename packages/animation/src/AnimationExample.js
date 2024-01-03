function Animation(target, props, duration, easing) {
    this.target = target;
    this.props = props;
    this.duration = duration || 1000;
    this.easing = easing || "linear";
    /**
     * [startTime description]
     * @type {number}
     */
    this.startTime = null;
    /**
     * [endTime description]
     * @type {number}
     */
    this.endTime = null;
    this.currentFrame = null;
    this.requestId = null;
    this.isPlaying = false;
    this.callbacks = {
        start: [],
        end: [],
        update: []
    };
}

Animation.prototype = {
    constructor: Animation,

    start: function () {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.startTime = performance.now();
        this.endTime = this.startTime + this.duration;
        this.currentFrame = this.getCurrentFrame();
        this.requestId = requestAnimationFrame(this.animate.bind(this));
        this.trigger("start");
    },

    pause: function () {
        if (!this.isPlaying) return;
        cancelAnimationFrame(this.requestId);
        this.isPlaying = false;
    },

    resume: function () {
        if (this.isPlaying) return;
        this.startTime = performance.now() - this.currentFrame * this.duration;
        this.endTime = this.startTime + this.duration;
        this.requestId = requestAnimationFrame(this.animate.bind(this));
        this.isPlaying = true;
    },

    stop: function () {
        if (!this.isPlaying) return;
        cancelAnimationFrame(this.requestId);
        this.isPlaying = false;
        this.trigger("end");
    },

    animate: function () {
        var now = performance.now();
        var progress = (now - this.startTime) / this.duration;
        progress = Math.min(Math.max(progress, 0), 1);
        var value = this.getValue(progress);

        this.setCurrentValue(value);
        this.trigger("update", value);

        if (now < this.endTime) {
            this.requestId = requestAnimationFrame(this.animate.bind(this));
        } else {
            this.isPlaying = false;
            this.trigger("end");
        }
    },

    getValue: function (progress) {
        var value = {};
        for (var prop in this.props) {
            var propValue = this.props[prop];
            if (typeof propValue === "number") {
                value[prop] = propValue * progress;
            } else if (Array.isArray(propValue)) {
                var startValue = propValue[0];
                var endValue = propValue[1];
                var deltaValue = endValue - startValue;
                value[prop] = startValue + deltaValue * this.easingFunctions[this.easing](progress);
            }
        }
        return value;
    },

    setCurrentValue: function (value) {
        for (var prop in value) {
            this.target.style[prop] = value[prop];
        }
    },

    getCurrentFrame: function () {
        var now = performance.now();
        return (now - this.startTime) / this.duration;
    },
    /**
     * [on description]
     * @param  {"start"|"end"|"update"}   eventType [description]
     * @param  {Function} callback  [description]
     * @return {[type]}             [description]
     */
    on: function (eventType, callback) {
        if (this.callbacks[eventType]) {
            this.callbacks[eventType].push(callback);
        }
    },
    /**
     * [trigger description]
     * @param  {"start"|"end"|"update"} eventType [description]
     * @param  {[type]} data      [description]
     * @return {[type]}           [description]
     */
    trigger: function (eventType, data) {
        var callbacks = this.callbacks[eventType];
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    },
    easingFunctions: {
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
    }
};