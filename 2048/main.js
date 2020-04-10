let score=0;
let board=[];
let add=[];
let id="unnamed";
let top1=0;
let top2=0;
let top3=0;

/*
function check() {//检查代码，后期消除
    document.getElementById("gameOver").style.display="none";
    score=0;
    changeColor();
    inBoard();
}
*/

function start() {//起初的开始游戏按键
    document.getElementById("toStart").style.display="none";
    score=0;
    cleanBoard();
    inBoard();
    newNumber();
    newNumber();
    changeColor();
}

function gameOver() {//你死了
    document.getElementById("gameOver").style.display="inline";
}

function newGame() {//新游戏
    scoreSet();
    document.getElementById("gameOver").style.display="none";
    score=0;
    showScore();
    cleanBoard();
    inBoard();
    newNumber();
    newNumber();
    changeColor();
}

function  nameCheck(){
    let name=document.getElementById("nameLine").value;
    let nameLength=name.length;
    if(nameLength>8){
        document.getElementById("toName").innerText="to much words";
    }
    else if (nameLength===0){
        id="unnamed";
        document.getElementById("name").style.display="none";
        showName(id);
    }
    else{
        id=name;
        document.getElementById("name").style.display="none";
        showName(id);
    }
}

function rename(){
    document.getElementById("name").style.display="inline";
}