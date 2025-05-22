import { tournBoard } from "./tournment.js";
const starttext = document.getElementById("frame");
const playGround = document.getElementById('playground');
const paddel1 = document.getElementById("padle1");
let paddle1XY = paddel1.getBoundingClientRect();
const paddel2 = document.getElementById("padle2");
let paddle2XY = paddel2.getBoundingClientRect();
let playGroundrect = playGround.getBoundingClientRect();
const ball = document.getElementById('ball');
let ballRect = ball.getBoundingClientRect();
const p1Score = document.getElementById('player1score');
const p2Score = document.getElementById('player2score');
export const paddel3 = document.getElementById("padle3");
let paddle3XY = paddel3.getBoundingClientRect();
export const paddel4 = document.getElementById("padle4");
let paddle4XY = paddel4.getBoundingClientRect();
export let gameRunning = false;
export function resizeGame() {
    paddle1XY = paddel1.getBoundingClientRect();
    paddle2XY = paddel2.getBoundingClientRect();
    paddle3XY = paddel3.getBoundingClientRect();
    paddle4XY = paddel4.getBoundingClientRect();
    playGroundrect = playGround.getBoundingClientRect();
    ballRect = ball.getBoundingClientRect();
}
export const players = {
    player1: 0,
    player2: 0
};
export const games = {
    gametype: ''
};
let keyPressed = {};
let paddle1Speed = 0;
let paddle1YPos = playGroundrect.height / 2;
let paddle2Speed = 0;
let paddle3YPos = playGroundrect.height / 2;
let paddle3Speed = 0;
let paddle4YPos = playGroundrect.height / 2;
let paddle4Speed = 0;
let paddle2YPos = playGroundrect.height / 2;
let ballX = (playGroundrect.right - playGroundrect.left) / 2;
let ballY = (playGroundrect.bottom - playGroundrect.top) / 2;
let ballSpeedX = playGroundrect.width / 160;
let ballSpeedY = playGroundrect.height / 160;
let oldBallX = ballX;
let oldDirctionX = ballX;
let newBallX = ballX;
let oldBallY = ballY;
const acceleration = 1;
const maxSpeed = 21;
const aiMaxSpeed = 12;
const aiAcceleration = 4;
document.addEventListener('keydown', handleKeys);
document.addEventListener('keyup', handleKeyUp);
export function startGame(e) {
    return new Promise((resolve) => {
        if (players.player1 === 0 && players.player2 === 0 && games.gametype === 'tournment')
            tournBoard.style.display = 'flex';
        if (e.code === 'Space' && players.player1 < 3
            && players.player2 < 3) {
            tournBoard.style.display = 'none';
            document.removeEventListener('keyup', startGame);
            gameRunning = true;
            starttext.style.display = 'none';
            if (games.gametype === 'tournment')
                gameLoopTournment(resolve);
            else if (games.gametype === '1v1' || games.gametype === 'AI')
                gameLoop1v1(resolve);
            else if (games.gametype === '2v2')
                gameLoop2v2(resolve);
        }
    });
}
function gameLoopTournment(resolve) {
    if (players.player1 === 3) {
        tournBoard.style.display = 'flex';
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(3);
    }
    else if (players.player2 === 3) {
        tournBoard.style.display = 'flex';
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(2);
    }
    if (gameRunning) {
        upDatePaddle1();
        upDatePaddle2();
        upDateBall();
        upDatePlayresScore();
        setTimeout(() => gameLoopTournment(resolve), 15);
    }
}
function gameLoop1v1(resolve) {
    if (players.player1 === 3) {
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(3);
    }
    else if (players.player2 === 3) {
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(2);
    }
    if (gameRunning) {
        upDatePaddle1();
        if (games.gametype === '1v1')
            upDatePaddle2();
        else if (games.gametype === 'AI')
            upDatePaddleAi();
        upDateBall();
        upDatePlayresScore();
        setTimeout(() => gameLoop1v1(resolve), 15);
    }
}
function gameLoop2v2(resolve) {
    if (players.player1 === 3) {
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(3);
    }
    else if (players.player2 === 3) {
        gameRunning = false;
        players.player1 = 0;
        players.player2 = 0;
        p1Score.innerText = '0';
        p2Score.innerText = '0';
        resolve(2);
    }
    if (gameRunning) {
        upDatePaddle1();
        upDatePaddle2();
        upDatePaddle3();
        upDatePaddle4();
        upDateBall();
        upDatePlayresScore();
        setTimeout(() => gameLoop2v2(resolve), 15);
    }
}
function upDatePaddleAi() {
    newBallX = ballX;
    if (oldBallX < newBallX) {
        if (paddle2YPos > ballY && ballY <= oldBallY) {
            paddle2Speed = Math.max(paddle2Speed - aiAcceleration, -aiMaxSpeed);
        }
        else if (paddle2YPos < ballY && ballY >= oldBallY) {
            paddle2Speed = Math.min(paddle2Speed + aiAcceleration, aiMaxSpeed);
        }
        else {
            if (paddle2Speed > 0) {
                paddle2Speed = Math.max(paddle2Speed - aiAcceleration - 1, 0);
            }
            else if (paddle2Speed < 0) {
                paddle2Speed = Math.min(paddle2Speed + aiAcceleration - 1, 0);
            }
        }
    }
    oldBallX = newBallX;
    oldBallY = ballY;
    paddle2YPos += paddle2Speed;
    if (paddle2YPos - paddle2XY.height / 2 <= 0) {
        paddle2YPos = paddle2XY.height / 2;
    }
    if (paddle2YPos + (paddle2XY.height / 2) >= playGroundrect.bottom - playGroundrect.top) {
        paddle2YPos = (playGroundrect.bottom - playGroundrect.top) - (paddle2XY.height / 2);
    }
    paddel2.style.top = paddle2YPos + 'px';
}
function handleKeys(e) {
    keyPressed[e.key] = true;
}
function handleKeyUp(e) {
    keyPressed[e.key] = false;
}
function upDatePaddle1() {
    if (keyPressed['w']) {
        paddle1Speed = Math.max(paddle1Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['s']) {
        paddle1Speed = Math.min(paddle1Speed + acceleration, maxSpeed);
    }
    else {
        if (paddle1Speed > 0) {
            paddle1Speed = Math.max(paddle1Speed - acceleration, 0);
        }
        else if (paddle1Speed < 0) {
            paddle1Speed = Math.min(paddle1Speed + acceleration, 0);
        }
    }
    paddle1YPos += paddle1Speed;
    if (paddle1YPos - (paddle1XY.height / 2) <= 0) {
        paddle1YPos = (paddle1XY.height / 2);
    }
    if (paddle1YPos + (paddle1XY.height / 2) >= playGroundrect.bottom - playGroundrect.top) {
        paddle1YPos = playGroundrect.bottom - playGroundrect.top - (paddle1XY.height / 2);
    }
    paddel1.style.top = paddle1YPos + 'px';
}
function upDatePaddle2() {
    if (keyPressed['ArrowUp']) {
        paddle2Speed = Math.max(paddle2Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['ArrowDown']) {
        paddle2Speed = Math.min(paddle2Speed + acceleration, maxSpeed);
    }
    else {
        if (paddle2Speed > 0) {
            paddle2Speed = Math.max(paddle2Speed - acceleration, 0);
        }
        else if (paddle2Speed < 0) {
            paddle2Speed = Math.min(paddle2Speed + acceleration, 0);
        }
    }
    paddle2YPos += paddle2Speed;
    if (paddle2YPos - (paddle2XY.height / 2) <= 0) {
        paddle2YPos = (paddle2XY.height / 2);
    }
    if (paddle2YPos + (paddle2XY.height / 2) >= playGroundrect.bottom - playGroundrect.top) {
        paddle2YPos = playGroundrect.bottom - playGroundrect.top - (paddle2XY.height / 2);
    }
    paddel2.style.top = paddle2YPos + 'px';
}
function upDatePaddle3() {
    if (keyPressed['h']) {
        paddle3Speed = Math.max(paddle3Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['n']) {
        paddle3Speed = Math.min(paddle3Speed + acceleration, maxSpeed);
    }
    else {
        if (paddle3Speed > 0) {
            paddle3Speed = Math.max(paddle3Speed - acceleration, 0);
        }
        else if (paddle3Speed < 0) {
            paddle3Speed = Math.min(paddle3Speed + acceleration, 0);
        }
    }
    paddle3YPos += paddle3Speed;
    if (paddle3YPos - (paddle3XY.height / 2) <= 0) {
        paddle3YPos = (paddle3XY.height / 2);
    }
    if (paddle3YPos + (paddle3XY.height / 2) >= playGroundrect.bottom - playGroundrect.top) {
        paddle3YPos = playGroundrect.bottom - playGroundrect.top - (paddle3XY.height / 2);
    }
    paddel3.style.top = paddle3YPos + 'px';
}
function upDatePaddle4() {
    if (keyPressed['6']) {
        paddle4Speed = Math.max(paddle4Speed - acceleration, -maxSpeed);
    }
    else if (keyPressed['3']) {
        paddle4Speed = Math.min(paddle4Speed + acceleration, maxSpeed);
    }
    else {
        if (paddle4Speed > 0) {
            paddle4Speed = Math.max(paddle4Speed - acceleration, 0);
        }
        else if (paddle4Speed < 0) {
            paddle4Speed = Math.min(paddle4Speed + acceleration, 0);
        }
    }
    paddle4YPos += paddle4Speed;
    if (paddle4YPos - (paddle4XY.height / 2) <= 0) {
        paddle4YPos = (paddle4XY.height / 2);
    }
    if (paddle4YPos + paddle4XY.height / 2 >= playGroundrect.bottom - playGroundrect.top) {
        paddle4YPos = playGroundrect.bottom - playGroundrect.top - (paddle4XY.height / 2);
    }
    paddel4.style.top = paddle4YPos + 'px';
}
function upDateBall() {
    ballX -= ballSpeedX;
    ballY -= ballSpeedY;
    if (games.gametype === '2v2') {
        if (ballX - (ballRect.width / 2) <= (paddle3XY.right - playGroundrect.left)
            && oldDirctionX - (ballRect.width / 2) >= (paddle3XY.right - playGroundrect.left)
            && ballY + (ballRect.width / 2) >= (paddle3YPos - (paddle3XY.height / 2))
            && ballY - (ballRect.width / 2) <= (paddle3YPos + (paddle3XY.height / 2))) {
            ballSpeedX *= -1;
            ballSpeedX -= 0.5;
            ballSpeedY -= 0.5;
        }
        else if (ballX + (ballRect.width / 2) >= paddle4XY.left - playGroundrect.left
            && oldDirctionX + (ballRect.width / 2) <= (paddle4XY.left - playGroundrect.left)
            && ballY + (ballRect.width / 2) >= (paddle4YPos - (paddle4XY.height / 2))
            && ballY - (ballRect.width / 2) <= (paddle4YPos + (paddle4XY.height / 2))) {
            ballSpeedX *= -1;
            ballSpeedX += 0.5;
            ballSpeedY += 0.5;
        }
    }
    if (ballY + (ballRect.height / 2) >= playGroundrect.bottom - playGroundrect.top
        || ballY - (ballRect.height / 2) <= 0)
        ballSpeedY *= -1;
    if (ballX - (ballRect.width / 2) <= (paddle1XY.right - playGroundrect.left)
        && oldDirctionX - (ballRect.width / 2) >= (paddle1XY.right - playGroundrect.left)
        && ballY + (ballRect.width / 2) >= (paddle1YPos - (paddle1XY.height / 2))
        && ballY - (ballRect.width / 2) <= (paddle1YPos + (paddle1XY.height / 2))) {
        ballSpeedX *= -1;
        ballSpeedX -= 0.5;
        ballSpeedY += 0.7;
    }
    else if (ballX + (ballRect.width / 2) >= paddle2XY.left - playGroundrect.left
        && oldDirctionX + (ballRect.width / 2) <= (paddle2XY.left - playGroundrect.left)
        && ballY + (ballRect.width / 2) >= (paddle2YPos - (paddle2XY.height / 2))
        && ballY - (ballRect.width / 2) <= (paddle2YPos + (paddle2XY.height / 2))) {
        ballSpeedX *= -1;
        ballSpeedX += 0.5;
        ballSpeedY += 0.7;
    }
    if (ballX - (ballRect.width / 2) < 0 && oldDirctionX - (ballRect.width / 2) < 0) {
        players.player2++;
        ball.style.display = 'none';
        resetGame();
    }
    if (ballX + (ballRect.width / 2) > paddle2XY.left - playGroundrect.left
        && oldDirctionX + (ballRect.width / 2) > paddle2XY.left - playGroundrect.left) {
        players.player1++;
        ball.style.display = 'none';
        resetGame();
    }
    oldDirctionX = ballX;
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
}
function upDatePlayresScore() {
    p1Score.innerText = players.player1.toString();
    p2Score.innerText = players.player2.toString();
}
function resetGame() {
    gameRunning = false;
    keyPressed = {};
    paddle1Speed = 0;
    paddle1YPos = playGroundrect.height / 2;
    paddle2Speed = 0;
    paddle2YPos = playGroundrect.height / 2;
    paddle3Speed = 0;
    paddle3YPos = playGroundrect.height / 2;
    paddle4Speed = 0;
    paddle4YPos = playGroundrect.height / 2;
    ballX = (playGroundrect.right - playGroundrect.left) / 2;
    ballY = (playGroundrect.bottom - playGroundrect.top) / 2;
    ballSpeedX = playGroundrect.width / 160;
    ballSpeedY = playGroundrect.height / 160;
    ball.style.display = 'block';
    starttext.style.display = 'block';
    if (players.player1 < 3 && players.player2 < 3)
        document.addEventListener('keyup', startGame);
}
