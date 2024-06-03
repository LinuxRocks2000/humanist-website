// CSS property animator

class CSSAnimator {
    constructor(target, property, aTime, units = "px", current = 0) {
        this.target = target;
        this.property = property;
        this.animationDuration = aTime; // in milliseconds
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
            this.current = this.start + (this.goal - this.start) * perc;
            this.target.style.setProperty(this.property, this.current + this.units);
        }
    }

    startAnimation() {
        const animFrame = () => {
            this.tick();
            requestAnimationFrame(animFrame);
        }
        animFrame();
    }

    set(goal) {
        this.start = this.current;
        this.goal = goal;
        this.goalTime = window.performance.now() + this.animationDuration;
    }

    getC() { // return the current INTERPOLATED step (the current value of the css property)
        return this.current;
    }
}
