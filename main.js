import { startGame , gameRunning , players, } from "./script.js";

const gamesboard = document.getElementById('games');
const button1v1 = document.getElementById('v1');
const winnerBoard  = document.getElementById('frame2');
const winnerText = document.getElementById('winnerText');
const resetMatch = document.getElementById('resetMatch');
const quitGame = document.getElementById('quit');
const tournment = document.getElementById('tournment');
const username = document.getElementById('userName');
const inputName = document.getElementById('inputName');
const submit = document.getElementById('submit');
const player1Name = document.getElementById('player1name');
const player2Name = document.getElementById('player2name');
const error =  document.getElementById('error');
const tournmentNames = document.getElementById('tournmentNames');
const error2 = document.getElementById('error2');
const inputName2 = document.getElementById('inputName2');
const inputName3 = document.getElementById('inputName3');
const inputName4 = document.getElementById('inputName4');
const submitUsers = document.getElementById('submitUsers');
const reTournment = document.getElementById('restartTournment');

let p1 = player1Name.innerText;
let p2 = '';
let p3 = '';
let p4 = '';
let winners = [];

winnerBoard.style.display = 'none';
quitGame.addEventListener('click', quit);
resetMatch.addEventListener('click', game1v1);
reTournment.addEventListener('click', startTournment);

gameMenu();

function    gameMenu()
{
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    tournment.addEventListener('click', startTournment)
    
}



function    quit()
{
    player2Name.innerText = '';
    p2 = '', p3 = '', p4 = '', winners[0] = '', winners[1] = '', winners[2] = '';
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    
}


async function    game1v1()
{
    let res = 0;
    players.player1 = 0;
    players.player2 = 0;
    if (player2Name.innerText === '' || player2Name.innerText === null)
        getUserName(player2Name);
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'none';
    document.addEventListener('keyup',async (event) => {
        if (!gameRunning && player2Name.innerText)
            res = await startGame(event);
        if (res === 3)
            winnerText.innerText = player1Name.innerText + " win";
        else if (res === 2) 
            winnerText.innerText = player2Name.innerText + " win";
        if (res === 2 || res === 3){
            res = 0;
            reTournment.style.display = 'none';
            resetMatch.style.display = 'block';
            winnerBoard.style.display = 'flex';
        } 
})}

function    getUserName(playername)
{
    username.style.display = 'flex';
    submit.addEventListener('click',  (e) => {
        if (inputName.value === ''){
            e.preventDefault()
            error.innerText = "Enter username";
            error.style.display = "block";
        }
        else if (inputName.value.length > 10){
            e.preventDefault();
            error.innerText = "Too long username";
            error.style.display = "flex";
        }else{
            playername.innerText = inputName.value;
            error.style.display = 'none';
            username.style.display = 'none';
            inputName.value = '';
        }
})}
    
async function    startTournment()
{
    players.player1 = 0;
    players.player2 = 0; 
    winners[0] = '', winners[1] = '', winners[2] = '';
    gamesboard.style.display = 'none';
    winnerBoard.style.display = 'none';
    if (p2 === ''  || p3 === '' || p4 === '')
        await getParticepantNames();
    player1Name.innerText = p1;
    player2Name.innerText = p2;
    document.addEventListener('keyup',  firstRound);
    
    
}

async function firstRound(event) {
    let res;
    if (!gameRunning && p2) {
            res = await startGame(event);
        if (res === 3)
            winners[0] = p1;
        else if (res === 2)
            winners[0] = p2;
        if (winners[0]){
            players.player1 = 0;
            players.player2 = 0;
            player1Name.innerText = p3;
            player2Name.innerText = p4;
        }
        if (winners[0]){
            res = 0;
            document.addEventListener('keyup', secondRound);
            document.removeEventListener('keyup', firstRound); 
        }     
    }
}

async function secondRound(event) {
    let res;
    if (!gameRunning && winners[0]){
        res = await startGame(event);
        if (res === 3)
            winners[1] = p3;
        else if (res === 2)
            winners[1] = p4;
        if (winners[0] && winners[1]){
            players.player1 = 0;
            players.player2 = 0;
            player1Name.innerText = winners[0];
            player2Name.innerText = winners[1];
        }
    }
    if (winners[0] && winners[1]){
        document.removeEventListener('keyup', secondRound);
        document.addEventListener('keyup', finnalRound);
    }
} 

async function finnalRound(event) {
    let res;
    if (!gameRunning && winners[1]){
        res = await startGame(event);
        if (res === 3)
            winners[2]= winners[0];
        else if (res === 2)
            winners[2] = winners[1];
    }
    if (winners[2])
    {
        res = 0;
        document.removeEventListener('keyup', finnalRound); 
        winnerText.innerText = winners[2] +  " win";
        resetMatch.style.display = 'none';
        reTournment.style.display = 'block';
        winnerBoard.style.display = 'flex';
}}





function getParticepantNames() {
    return new Promise((resolve) => {
      tournmentNames.style.display = 'flex';
  
      function handleSubmit(e) {
        e.preventDefault();
        if (inputName2.value === '' ||
          inputName3.value === '' ||
          inputName4.value === ''
        ) {
          error2.innerText = "All participants should have a username";
          error2.style.display = "block";
        } else if (inputName2.value.length > 10 ||
          inputName3.value.length > 10 ||
          inputName4.value.length > 10
        ) {
          error2.innerText = "Too long username";
          error2.style.display = "block";
        } else {
          p2 = inputName2.value;
          p3 = inputName3.value;
          p4 = inputName4.value;
  
          error2.style.display = 'none';
          tournmentNames.style.display = 'none';
          submitUsers.removeEventListener('click', handleSubmit);
          inputName2.value = '';
          inputName3.value = '';
          inputName4.value = '';
          resolve();
        }
      }
      submitUsers.addEventListener('click', handleSubmit);
})}