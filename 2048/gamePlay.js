function isGameOver() {//你死了
    if(canMoveLeft()===false&&canMoveRight()===false&&canMoveDown()===false&&canMoveUp()===false)
        gameOver();
}

function moveLeft() {//移动的过程
    if(canMoveLeft()===false)
        return false;
    cleanAdd();
    for(let i=0;i<4;i++)
        for(let j=1;j<4;j++){
            if(board[i][j]!==0)
                for(let k=j;k>0;k--){
                    if(board[i][k-1]===0){
                        board[i][k-1]=board[i][k];
                        board[i][k]=0;
                        add[i][k-1]=add[i][k];
                        add[i][k]=0;
                    }
                    if(board[i][k-1]===board[i][k]&&add[i][k-1]===0&&add[i][k]===0){
                        board[i][k-1]*=2;
                        score+=board[i][k-1];
                        board[i][k]=0;
                        add[i][k]=0;
                        add[i][k-1]+=1;
                    }
                }

        }
    showAllNumber(board);
    newNumber();
    changeColor();
    isGameOver();
}

function moveRight() {
    if(canMoveRight()===false)
        return false;

    cleanAdd();
    for(let i=0;i<4;i++)
        for(let j=2;j>=0;j--){
            if(board[i][j]!==0)
                for(let k=j;k<3;k++){
                    if(board[i][k+1]===0){
                        board[i][k+1]=board[i][k];
                        board[i][k]=0;
                        add[i][k+1]=add[i][k];
                        add[i][k]=0;
                    }
                    if(board[i][k+1]===board[i][k]&&add[i][k+1]===0&&add[i][k]===0){
                        board[i][k+1]*=2;
                        score+=board[i][k+1];
                        board[i][k]=0;
                        add[i][k]=0;
                        add[i][k+1]+=1;
                    }
                }
        }
    showAllNumber(board);
    newNumber();
    changeColor();
    isGameOver();
}

function moveUp() {
    if(canMoveUp()===false)
        return false;

    cleanAdd();
    for(let j=0;j<4;j++)
        for(let i=1;i<4;i++){
            if(board[i][j]!==0)
                for(let k=i;k>0;k--){
                    if(board[k-1][j]===0){
                        board[k-1][j]=board[k][j];
                        board[k][j]=0;
                        add[k-1][j]=add[k][j];
                        add[k][j]=0;
                    }
                    if(board[k-1][j]===board[k][j]&&add[k-1][j]===0&&add[k][j]===0){
                        board[k-1][j]*=2;
                        score+=board[k-1][j];
                        board[k][j]=0;
                        add[k][j]=0;
                        add[k-1][j]+=1;
                    }
                }

        }
    showAllNumber(board);
    newNumber();
    changeColor();
    isGameOver();
}

function moveDown() {
    if(canMoveDown()===false)
        return false;

    cleanAdd();
    for(let j=0;j<4;j++)
        for(let i=2;i>=0;i--){
            if(board[i][j]!==0)
                for(let k=i;k<3;k++){
                    if(board[k+1][j]===0){
                        board[k+1][j]=board[k][j];
                        board[k][j]=0;
                        add[k+1][j]=add[k][j];
                        add[k][j]=0;
                    }
                    if(board[k+1][j]===board[k][j]&&add[k+1][j]===0&&add[k][j]===0){
                        board[k+1][j]*=2;
                        score+=board[k+1][j];
                        board[k][j]=0;
                        add[k][j]=0;
                        add[k+1][j]+=1;
                    }
                }

        }
    showAllNumber(board);
    newNumber();
    changeColor();
    isGameOver();
}


function canMoveLeft(){//可以移动的判定
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            if(board[i][j]!==0&&j!==0)
                if(board[i][j-1]===0||board[i][j-1]===board[i][j])
                    return true;
        }
    return false;
}

function canMoveRight(){
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            if(board[i][j]!==0&&j!==3)
                if(board[i][j+1]===0||board[i][j+1]===board[i][j])
                    return true;
        }
    return false;
}

function canMoveUp(){
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            if(board[i][j]!==0&&i!==0)
                if(board[i-1][j]===0||board[i-1][j]===board[i][j])
                    return true;
        }
    return false;
}

function canMoveDown(){
    for (let i=0;i<4;i++)
        for (let j=0;j<4;j++){
            if(board[i][j]!==0&&i!==3)
                if(board[i+1][j]===0||board[i+1][j]===board[i][j])
                    return true;
        }
    return false;
}