import { players , gameRunning , startGame, games} from "./game.js";
import { winnerBoard, gamesboard , resetMatch} from "./main.js";
import { player2Name , player1Name, reTournment} from "./tournment.js";


const error =  document.getElementById('error');
const inputName = document.getElementById('inputName');
const username = document.getElementById('userName');

export async function    game1v1()
{
    games.gametype = '1v1';
    players.player1 = 0;
    players.player2 = 0;
    if (player2Name.innerText === '' || player2Name.innerText === null)
        getUserName(player2Name);
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'none';
    document.addEventListener('keyup', onevsone);
}


async function    onevsone(event){
    let res = 0;
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
        document.removeEventListener('keyup', onevsone);
    } 
}

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