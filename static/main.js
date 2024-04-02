var oldScrollY = 0; // for dY calculation
var lastUp = 0;
const el = { // for nicer accesses than document.getElementById
    header: document.getElementById("header")
};

function onscroll() {
    var dY = oldScrollY - document.documentElement.scrollTop;
    oldScrollY = document.documentElement.scrollTop;
    if (dY > 0) {
        lastUp = document.documentElement.scrollTop;
    }
    if (dY > 20 || document.documentElement.scrollTop < 100) {
        el.header.classList.remove("header-hidden");
    }
    else if (Math.abs(lastUp - document.documentElement.scrollTop) > 200) {
        el.header.classList.add("header-hidden");
    }
}

window.addEventListener("scroll", onscroll);
window.addEventListener("wheel", onscroll);