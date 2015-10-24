var ticking = false,
    lastMousePosition = { x: 0, y: 0 },
    scrollPosition = 0,
    center = {x: 0, y: 0},
    moveEls = document.querySelectorAll('.js-parallax'),
    moveElsLength = moveEls.length,
    steps = ['images','videos','docs'];

getScreenCenter();
calculateBg();

document.addEventListener('scroll', MoveHandler);

function calculateBg() {
    var w = window.innerWidth + 100,
        h = window.innerHeight + 50,
        scaleW = w/1200, // 1200 is width of container;
        scaleH = h/744,
        newScale = Math.max(scaleW, scaleH);

        if(newScale < 1) {
            newScale = 1;
        }

        console.log(scaleW, scaleH);

        document.querySelector('.bg').style.transform = 'scale('+ newScale  + ')';


}


function getScreenCenter() {

    center.x = window.innerWidth/2;
    center.y = window.innerHeight/2;
}

function MoveHandler(e) {
    console.log(e);
    scrollPosition = window.scrollY;
    console.log(scrollPosition);e
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

    // var baseMovement = {x: center.x - lastMousePosition.x, y: center.y - lastMousePosition.y };
    //
    for (var i = 0; i < moveElsLength; i++) {
        var depth = moveEls[i].getAttribute('data-depth');
        moveEls[i].style.transform = "translate3d(0px, " + - scrollPosition/depth + "px, 0)";
    }


    // Calculate base movement
}

setInterval(updateActive,1000);

function updateActive() {

}
