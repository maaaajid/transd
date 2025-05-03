const starttext = document.getElementById("frame");
const restartText = document.getElementById('restartText');
const playGround = document.getElementById('playground');
const paddel1 = document.getElementById("padle1");
const paddle1XY = paddel1.getBoundingClientRect();
const paddel2 = document.getElementById("padle2");
const paddle2XY = paddel1.getBoundingClientRect();
const playGroundrect = playGround.getBoundingClientRect();
const ball = document.getElementById('ball');
const ballRect = ball.getBoundingClientRect();
const p1Score = document.getElementById('player1score');
const p2Score = document.getElementById('player2score');

export let gameRunning = false;
let keyPressed = {};
let paddle1Speed = 0;
let paddle1YPos = playGroundrect.height / 2;
let paddle2Speed = 0;
let paddle2YPos = playGroundrect.height / 2;
let ballX = (playGroundrect.right - playGroundrect.left) / 2;
let ballY = (playGroundrect.bottom - playGroundrect.top) / 2;
let ballSpeedX = 34;
let ballSpeedY = 18;
export const players = {
    player1 :  0,
    player2 :  0
};

const acceleration = 1;
const maxSpeed = 25;

document.addEventListener('keydown', handleKeys);
document.addEventListener('keyup', handleKeyUp);

export  function startGame(e) {
    return new Promise((resolve) => {
    if (e.code === 'Space' && players.player1 < 3 
        && players.player2 < 3){
            document.removeEventListener('keyup', startGame);
            gameRunning = true;
            starttext.style.display = 'none';
            gameLoop(resolve);
        }
    })
}



function    gameLoop(resolve) {
    if (players.player1 === 3) {
        gameRunning = false;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(3);
    } else if (players.player2 === 3){
        gameRunning = false;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(2);
    }
    if (gameRunning) {
        upDatePaddle1();
        upDatePaddle2();
        upDateBall();
        upDatePlayresScore();
        setTimeout(() => gameLoop(resolve), 16);
    }
}

function    handleKeys(e) {
    keyPressed[e.key] = true;
}

function    handleKeyUp(e)
{
    keyPressed[e.key] = false;
}

function    upDatePaddle1() {
    
    if (keyPressed['w']){
        paddle1Speed = Math.max(paddle1Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['s']){
        paddle1Speed = Math.min(paddle1Speed + acceleration, maxSpeed);
    }
    else{
        if(paddle1Speed > 0)
        {
            paddle1Speed = Math.max(paddle1Speed - acceleration, 0);
        }
        else if(paddle1Speed < 0)
        {
            paddle1Speed = Math.min(paddle1Speed + acceleration, 0);
        }
    }
    paddle1YPos += paddle1Speed;
    if (paddle1YPos - paddle1XY.height / 2 <= 0)
    {
        paddle1YPos -= paddle1Speed;
    }
    if (paddle1YPos + paddle1XY.height / 2 >= playGroundrect.bottom - playGroundrect.top)
    {
        paddle1YPos -= paddle1Speed;
    }
    paddel1.style.top = paddle1YPos + 'px';
}

function    upDatePaddle2() {
    
    if (keyPressed['ArrowUp']){
        paddle2Speed = Math.max(paddle2Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['ArrowDown']){
        paddle2Speed = Math.min(paddle2Speed + acceleration, maxSpeed);
    }
    else{
        if(paddle2Speed > 0)
        {
            paddle2Speed = Math.max(paddle2Speed - acceleration, 0);
        }
        else if(paddle2Speed < 0)
        {
            paddle2Speed = Math.min(paddle2Speed + acceleration, 0);
        }
    }
    paddle2YPos += paddle2Speed;
    if (paddle2YPos - paddle2XY.height / 2 <= 0)
        {
            paddle2YPos -= paddle2Speed;
        }
    if (paddle2YPos + paddle2XY.height / 2 >= playGroundrect.bottom - playGroundrect.top)
        {
        paddle2YPos -= paddle2Speed;
    }
    paddel2.style.top = paddle2YPos + 'px';
}






function upDateBall() {
    ballX -= ballSpeedX;
    ballY -= ballSpeedY;
    
    
    if (ballY + 10 >= playGroundrect.bottom - playGroundrect.top || ballY - 10 <= 0)
    {
        ballSpeedY *= -1;
    }
    else if (ballX - (ballRect.width / 2) <= (paddle1XY.right - playGroundrect.left)
        && ballX - (ballRect.width / 2)  >= (paddle1XY.right - playGroundrect.left) - ballSpeedX
        && ballY + (ballRect.width / 2)  >= (paddle1YPos - (paddle1XY.height / 2) - ballSpeedY)
        && ballY - (ballRect.width / 2)  <= (paddle1YPos + (paddle1XY.height / 2) + ballSpeedY))
    {
        ballSpeedX *= -1;
        ballSpeedX -= 0.5;
        ballSpeedY -= 0.5;
    }
    else if (ballX + (ballRect.width)  >= playGroundrect.right  - paddle2XY.left
        && ballX + (ballRect.width)  <= playGroundrect.right  - paddle2XY.left - ballSpeedX
        && ballY + (ballRect.width / 2)  >= (paddle2YPos - (paddle2XY.height / 2))
        && ballY - (ballRect.width / 2)  <= (paddle2YPos + (paddle2XY.height / 2)))
    {
        ballSpeedX *= -1;
        ballSpeedX += 0.5;
        ballSpeedY += 0.5;
    }

    if (ballX - (ballRect.width / 2)  < 0)
    {
        players.player2++;
        ball.style.display = 'none';
        resetGame();
    }
    if (ballX - (ballRect.width / 2)  > playGroundrect.right - paddle2XY.left)
        {
            players.player1++;
            ball.style.display = 'none';
            resetGame();
        }
        ball.style.top = ballY + 'px';
        ball.style.left = ballX + 'px';
        
}
    
function    upDatePlayresScore() {
    p1Score.innerText = players.player1;
    p2Score.innerText = players.player2;
}
    
    

function    resetGame() {
    gameRunning = false;
    keyPressed = {};
    paddle1Speed = 0;
    paddle1YPos = playGroundrect.height / 2;
    paddle2Speed = 0;
    paddle2YPos = playGroundrect.height / 2;
    ballX = (playGroundrect.right - playGroundrect.left) / 2;
    ballY = (playGroundrect.bottom - playGroundrect.top) / 2;
    ballSpeedX = 14;
    ballSpeedY = 8;
    ball.style.display = 'block';
    starttext.style.display = 'block';
    document.addEventListener('keyup', startGame);
}