const slides = Array.from(document.getElementById("slideshow-container").children);
const positiondicator_el = document.getElementById("positiondicator");
const pde_w = positiondicator_el.getBoundingClientRect().width;
const positiondicator = new CSSAnimator(positiondicator_el, "--fill-point", 250);

var slideshow_cur = 0;

function setSlideshow(num) { // set the slideshow to an index
    slideshow_cur = num;
    Array.from(document.getElementsByClassName("slideshow-visible")).forEach(el => {
        el.classList.remove("slideshow-visible");
    });
    slides[num].classList.add("slideshow-visible");
    positiondicator.set(num / slides.length * pde_w);
}

var last = window.performance.now();

function main() { // bump up the slider
    var cTime = window.performance.now();
    var sElapsed = (cTime - last) / 1000;
    last = cTime;
    var slider_num = Math.floor(slides.length * positiondicator.getC() / pde_w); // the block the slider's in
    if (slider_num < slides.length) {
        positiondicator.set(positiondicator.getC() + sElapsed * 500);
        if (slider_num != slideshow_cur) {
            setSlideshow(slider_num);
        }
    }
    requestAnimationFrame(main);
}

positiondicator.startAnimation();
setSlideshow(0);

main();