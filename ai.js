import { players , gameRunning , startGame, games} from "./game.js";
import { winnerBoard, gamesboard , resetMatch , aiRematch} from "./main.js";
import { player2Name , player1Name, reTournment} from "./tournment.js";


export async function    startAiGame()
{
    games.gametype = 'AI';
    players.player1 = 0;
    players.player2 = 0;
    player2Name.innerText = 'ROBOTOMAS';
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'none';
    document.addEventListener('keyup', aiGame);
}


async function    aiGame(event){
    let res = 0;
    if (!gameRunning)
        res = await startGame(event);
    if (res === 3)
        winnerText.innerText = player1Name.innerText + " win";
    else if (res === 2) 
        winnerText.innerText = player2Name.innerText + " win";
    if (res === 2 || res === 3){
        res = 0;
        reTournment.style.display = 'none';
        resetMatch.style.display = 'none';
        aiRematch.style.display = 'block';
        winnerBoard.style.display = 'flex';
        document.removeEventListener('keyup', aiGame);
    } 
}