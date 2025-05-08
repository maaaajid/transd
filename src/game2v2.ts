import { gamesboard, winnerBoard, aiRematch , winnerText, resetMatch } from "./main.js";
import { gameRunning, startGame , games } from "./game.js";
import { getParticepantNames , tempName, player2Name, player1Name, reTournment} from "./tournment.js";

const reMatch2v2 = document.getElementById('reset2v2') as HTMLButtonElement;


export async function    startGame2v2(){
    games.gametype = '2v2';
    player2Name.innerText = tempName.p1;
    gamesboard.style.display = 'none';
    winnerBoard.style.display = 'none';
    if (tempName.p2 === ''  || tempName.p3 === '' || tempName.p4 === '')
        await getParticepantNames();
    if (tempName.p2 != '' &&  tempName.p3 != '' && tempName.p4 != ''){ 
            
        player1Name.innerText = tempName.p1;
        player2Name.innerText = tempName.p2;
        document.addEventListener('keyup',  game2v2);
    }
}

async function    game2v2(event: KeyboardEvent){
    let res :number = 0;
    if (!gameRunning && player2Name.innerText)
        res = await startGame(event);
    if (res === 3)
        winnerText.innerText = player1Name.innerText + " and " + tempName.p3 + " win";
    else if (res === 2) 
        winnerText.innerText = player2Name.innerText + " and " + tempName.p4 + " win";
    if (res === 2 || res === 3){
        res = 0;
        reTournment.style.display = 'none';
        aiRematch.style.display = 'none';
        resetMatch.style.display = 'none';
        reMatch2v2.style.display = 'block';
        winnerBoard.style.display = 'flex';
        document.removeEventListener('keyup', game2v2);
    } 
}