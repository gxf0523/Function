//移动指令响应
//键盘指令输入
document.onsystemevent = grabEvent;
document.onkeypress = grabEvent;
document.onirkeypress = grabEvent;
document.onkeyup = grabEvent;
function grabEvent() {
    let it = event.which||event;
    switch (it) {
        case 3:
        case 37:
        case 271://left
            moveLeft();
            showScore();
            break;
        case 1:
        case 38:
        case 269://up
            moveUp();
            showScore();
            break;
        case 4:
        case 39:
        case 272://right
            moveRight();
            showScore();
            break;
        case 2:
        case 40:
        case 270://down
            moveDown();
            showScore();
            break;
    }
}

function upKeyDown() {
    moveUp();
    showScore();
    document.getElementById("up").style.textShadow="0 0";
}

function rightKeyDown() {
    moveRight();
    showScore();
    document.getElementById("right").style.textShadow="0 0";
}

function downKeyDown() {
    moveDown();
    showScore();
    document.getElementById("down").style.textShadow="0 0";
}

function leftKeyDown() {
    moveLeft();
    showScore();
    document.getElementById("left").style.textShadow="0 0";
}

function upKeyUp() {
    document.getElementById("up").style.textShadow="2px 2px #655d60";
}

function rightKeyUp() {
    document.getElementById("right").style.textShadow="2px 2px #655d60";
}

function downKeyUp() {
    document.getElementById("down").style.textShadow="2px 2px #655d60";
}

function leftKeyUp() {
    document.getElementById("left").style.textShadow="2px 2px #655d60";
}