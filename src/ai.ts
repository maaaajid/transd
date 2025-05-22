import { players , gameRunning , startGame, games} from "./game.js";
import { winnerBoard, gamesboard , resetMatch , aiRematch, winnerText} from "./main.js";
import { player2Name , player1Name, reTournment} from "./tournment.js";
import { reMatch2v2 } from "./game2v2.js";

// let matchUID: string;

export async function    startAiGame()
{
    // try{

    //     matchUID = await getNewMatch(3);
        games.gametype = 'AI';
        players.player1 = 0;
        players.player2 = 0;
        player2Name.innerText = 'ROBOTOMAS';
        winnerBoard.style.display = 'none';
        gamesboard.style.display = 'none';
        document.addEventListener('keyup', aiGame);
    // }catch(e:unknown)
    // {
    //     if (e instanceof Error)
    //     {
    //         console.log(e.message);
    //             // TODO:print error with toast
    //     }
    // }
}


async function    aiGame(event: KeyboardEvent){
    let res: number = 0;
    if (!gameRunning)
        res = await startGame(event);
    if (res === 3){
        winnerText.innerText = player1Name.innerText + " win";
        // await sendWinOrLose(matchUID, true);
    }
    else if (res === 2) {
        winnerText.innerText = player2Name.innerText + " win";
        // await sendWinOrLose(matchUID, false);
    }
    if (res === 2 || res === 3){
        res = 0;
        reTournment.style.display = 'none';
        resetMatch.style.display = 'none';
        reMatch2v2.style.display = 'none';
        aiRematch.style.display = 'block';
        winnerBoard.style.display = 'flex';
        document.removeEventListener('keyup', aiGame);
    } 
}