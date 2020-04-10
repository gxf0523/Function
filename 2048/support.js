function scoreSet() {
    setHistory();
    setTop();
}

let date=new Date();

function setHistory() {//显示历史成绩
    let m=date.getMonth()+1;
    let d=date.getFullYear()+"年"+m+"月"+date.getDate()+"日"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let x=document.createElement("div");
    x.innerText=d+" "+id+"  "+score;
    let firstChild=document.getElementById("history").firstChild;
    document.getElementById("history").insertBefore(x,firstChild);
}

function setTop() {
    if(score>top1){
        putTop1();
        return true;
    }
    if(score>top2){
        putTop2();
        return true;
    }
    if(score>top3){
        putTop3();
        return true;
    }
}

function putTop1() {
    document.getElementById("top3").innerText=document.getElementById("top2").innerText;
    top3=top2;
    document.getElementById("top2").innerText=document.getElementById("top1").innerText;
    top2=top1;
    let m=date.getMonth()+1;
    let d=date.getFullYear()+"年"+m+"月"+date.getDate()+"日"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    document.getElementById("top1").innerText=d+" "+id+"  "+score;
    top1=score;
}

function putTop2() {
    document.getElementById("top3").innerText=document.getElementById("top2").innerText;
    top3=top2;
    let m=date.getMonth()+1;
    let d=date.getFullYear()+"年"+m+"月"+date.getDate()+"日"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    document.getElementById("top2").innerText=d+" "+id+"  "+score;
    top2=score;
}

function putTop3() {
    let m=date.getMonth()+1;
    let d=date.getFullYear()+"年"+m+"月"+date.getDate()+"日"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    document.getElementById("top3").innerText=d+" "+id+"  "+score;
    top3=score;
}

function inBoard() {//格子初始化
    for(let i = 0;i<4;i++) {
        board[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
}


function cleanAdd() {//清空格子合并的统计集
    for(let i = 0;i<4;i++) {
        add[i] = [];
        for (let j = 0; j < 4; j++) {
            add[i][j] = 0;
        }
    }
}

function cleanBoard() {//清理格子
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++) {
            let temp = document.getElementById("gamePlace_" + i + "_" + j);
            temp.innerText = "";
        }
}

function newNumber(){//生成随机的格子
    if (spaceCheck(board)===false) {
        return false;
    }
    let randx = Math.floor(Math.random()*4);
    let randy = Math.floor(Math.random()*4);
    while(true){
        if (board[randx][randy]===0)
            break;
        randx = Math.floor(Math.random()*4);
        randy = Math.floor(Math.random()*4);
    }
    let randNumber = Math.random()<0.5 ? 2 : 4;
    //在随机位置显示随机数字2or4
    board[randx][randy] = randNumber;
    score+=board[randx][randy];
    showNumber(randx,randy,randNumber);
    return true;
}

function showNumber(randx,randy,num) {//显示出数字
    let temp = document.getElementById("gamePlace_" + randx + "_" + randy);
    if(num===0){
        temp.innerText="";
    }
    else
        temp.innerText=num;
}

function showAllNumber(board) {
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++){
            let e=board[i][j];
            showNumber(i,j,e);
        }
}

function spaceCheck(board) {//监测是否有空余空间
    for(let i = 0;i<4;i++) {
        for (let j = 0; j < 4; j++) {
            if(board[i][j] === 0)
                return true;
        }
    }
    return false;
}

function showScore() {//更新当前分数
    document.getElementById("score").innerText="score:"+score;
}

function showName(id) {
    document.getElementById("nameRightNow").innerText="当前使用id:"+id;
}

function changeColor() {//颜色读取
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
        {
            let temp=document.getElementById("gamePlace_"+i+"_"+j);
            if(temp.innerText==="16384")
                temp.innerText="#14";
            if(temp.innerText==="32768")
                temp.innerText="#15";
            if(temp.innerText==="65536")
                temp.innerText="#16";
            if(temp.innerText==="")
                temp.style.background="aliceblue";
            if(temp.innerText==="2")
                temp.style.background="#fafbb0";
            if(temp.innerText==="4")
                temp.style.background="#cbd781";
            if(temp.innerText==="8")
                temp.style.background="#d0ce4a";
            if(temp.innerText==="16")
                temp.style.background="#d1a735";
            if(temp.innerText==="32")
                temp.style.background="#ffbab5";
            if(temp.innerText==="64")
                temp.style.background="#fb918a";
            if(temp.innerText==="128")
                temp.style.background="#fb4855";
            if(temp.innerText==="256")
                temp.style.background="#fb7ce6";
            if(temp.innerText==="512")
                temp.style.background="#9c82d1";
            if(temp.innerText==="1024")
                temp.style.background="#7376d0";
            if(temp.innerText==="2048")
                temp.style.background="#57aabd";
            if(temp.innerText==="4096")
                temp.style.background="#3f887c";
            if(temp.innerText==="8192")
                temp.style.background="#318853";
            if(temp.innerText==="#14")
                temp.style.background="#1c682c";
            if(temp.innerText==="#15")
                temp.style.background="#2c4816";
            if(temp.innerText==="#16")
                temp.style.background="#3a4811";
        }
}