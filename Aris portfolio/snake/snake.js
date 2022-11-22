//board
var blockSize = 25;
var rows = 28;
var columns = 28;
var board;
var context;

//snake head
snakeX = blockSize * 5;
snakeY = blockSize * 5;


var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY; 

//gameOver
var gameOver = false;

var score = 0;




window.onload = function()
{
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext('2d');
    
    placeFood();
    document.addEventListener('keyup', chanceDirection);
    //update();
    setInterval(update, 1000/10);
    
}



function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.height, board.width);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        score+=5;
        document.getElementById('score').innerHTML = 'Score : ' + score;
        placeFood();
    }

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'orange';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i<snakeBody.length; i++){
        context.fillStyle = 'yellow';
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //gameOver condition
    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        alert('Game Over!!!');
    }

    for (let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('Game Over!!!')
        }
    }

}


function chanceDirection(e){
    if (e.code == 'ArrowUp' && velocityY !=1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY!=-1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && velocityX !=1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && velocityX !=-1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


