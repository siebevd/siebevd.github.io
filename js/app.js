var ticking = false,
    lastMousePosition = { x: 0, y: 0 },
    scrollPosition = 0,
    center = {x: 0, y: 0},
    moveEls = document.querySelectorAll('.js-parallax'),
    moveElsLength = moveEls.length,
    steps = ['images','videos','docs'];

getScreenCenter();
calculateBg();


// Only on mobile
if (window.innerWidth > 760){
    document.addEventListener('scroll', MoveHandler);
    window.addEventListener('resize', calculateBg);

}

function calculateBg() {
    var w = window.innerWidth + 100,
        h = window.innerHeight + 50,
        scaleW = w/1200, // 1200 is width of container;
        scaleH = h/744,
        newScale = Math.max(scaleW, scaleH);

        if(newScale < 1) {
            newScale = 1;
        }


        document.querySelector('.bg').style.transform = 'scale('+ newScale  + ')';


}


function getScreenCenter() {

    center.x = window.innerWidth/2;
    center.y = window.innerHeight/2;
}

function MoveHandler(e) {
    scrollPosition = window.scrollY;
    //lastMousePosition.y = e.clientY;
    requestTick();
}

function requestTick() {
    if(!ticking) {
        requestAnimationFrame(updateMovement);
    }
    ticking = true;
}

function updateMovement() {
    ticking = false;

    for (var i = 0; i < moveElsLength; i++) {
        var depth = moveEls[i].getAttribute('data-depth');
        moveEls[i].style.transform = "translate3d(0px, " + - scrollPosition/depth + "px, 0)";
    }


}
