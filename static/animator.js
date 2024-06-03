// CSS property animator

const timing = { // timing functions
    // they take a percentage of animation time completion and output a percentage of animation completion
    linear(time) {
        return time;
    },
    quadSmooth(time) { // quadratic smooth like the CSS animation type
        if (time <= 0.5) {
            return 2 * time * time;
        }
        else {
            return -2 * (time - 1) ** 2 + 1
        }
    }
};


class CSSAnimator {
    constructor(target, property, aTime, units = "px", current = 0, timingFunction = timing.quadSmooth) {
        this.timingFunction = timingFunction;
        this.target = target;
        this.property = property;
        this.animationDuration = 0; // in milliseconds
        this.defaultAnimationDuration = aTime; // animationDuration is managed by set()
        this.units = units;
        this.current = current;
        this.start = this.current;
        this.goal = this.current;
        this.goalTime = 0;
    }

    tick() {
        var cTime = window.performance.now();
        if (this.goalTime > cTime) {
            var timeTill = this.goalTime - cTime;
            var perc = 1 - timeTill / this.animationDuration; // the percentage of completion in the current animation step
            this.current = this.start + (this.goal - this.start) * this.timingFunction(perc);
            this.target.style.setProperty(this.property, this.current + this.units);
        }
        else {
            this.target.style.setProperty(this.property, this.goal + this.units);
            if (this.oncomplete) {
                var oldOncomplete = this.oncomplete;
                this.oncomplete = undefined;
                oldOncomplete(); // the oncomplete function needs to be able to meaningfully set oncomplete, so we pop out the function pointer before clearing oncomplete().
            }
        }
    }

    startAnimation() {
        const animFrame = () => {
            this.tick();
            requestAnimationFrame(animFrame);
        }
        animFrame();
    }

    set(goal, oncomplete = undefined, dur = this.defaultAnimationDuration) {
        this.start = this.current;
        this.goal = goal;
        this.animationDuration = dur;
        this.goalTime = window.performance.now() + this.animationDuration;
        this.oncomplete = oncomplete;
    }

    add(amount) {
        this.set(this.getC() + amount);
    }

    getC() { // return the current INTERPOLATED step (the current value of the css property)
        return this.current;
    }
}
