const slides = Array.from(document.getElementById("slideshow-container").children);
const positiondicator_el = document.getElementById("positiondicator");
const pde_w = positiondicator_el.getBoundingClientRect().width;
const positiondicator = new CSSAnimator(positiondicator_el, "--fill-point", 250, "px", 0, timing.linear);
const containerLeft = new CSSAnimator(document.getElementById("slideshow-container"), "--offset-left", 500);

var slideshow_cur = 0;

function coterminal(n, about) {
    while (n < 0) {
        n += about;
    }
    while (n >= about) {
        n -= about;
    }
    return n;
}

function absdist(one, two) {
    return Math.abs(one - two);
}

function setSlideshow(num) { // set the slideshow to an index
    if (num < 0 || num >= slides.length) {
        return;
    } 
    slideshow_cur = num;
    Array.from(document.getElementsByClassName("slideshow-visible")).forEach(el => {
        el.classList.remove("slideshow-visible");
    });
    slides[num].classList.add("slideshow-visible");
    positiondicator.set((num) / slides.length * pde_w, () => {
        if (num < slides.length) {
            slidebump();
        }
    });
    //containerLeft.add(-1 * slides[num].getBoundingClientRect().left);
}

var last = window.performance.now();
var slideshowInterrupted = false;

containerLeft.startAnimation();
positiondicator.startAnimation();
setSlideshow(0);

function slidebump() { // bumps up the slider by one at a low speed. can be interrupted safely by pointer events.
    var go_at = slideshow_cur + 1;
    positiondicator.set((go_at) / slides.length * pde_w, () => {
        setSlideshow(go_at);
    }, 2000);
}

var isDown = false;
var dragStartPoint = {
    x: 0,
    y: 0
};

window.addEventListener("pointerdown", evt => {
    isDown = true;
    dragStartPoint.x = evt.clientX;
    dragStartPoint.y = evt.clientY;
});

window.addEventListener("touchstart", evt => {
    isDown = true;
    dragStartPoint.x = evt.touches[0].clientX;
    dragStartPoint.y = evt.touches[0].clientY;
});

function mouseup(deltaX, sensitivity = 100) {
    if (Math.abs(deltaX) > sensitivity) {
        if (deltaX > 0) {
            setSlideshow(slideshow_cur - 1);
        }
        else {
            setSlideshow(slideshow_cur + 1);
        }
        slideshowInterrupted = true;
    }
    isDown = false;
}

window.addEventListener("pointerup", evt => {
    var deltaX = evt.clientX - dragStartPoint.x;
    mouseup(deltaX);
});

window.addEventListener("touchend", evt => {
    var deltaX = evt.changedTouches[0].clientX - dragStartPoint.x;
    mouseup(deltaX, 30);
});
