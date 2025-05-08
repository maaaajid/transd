import { gamesboard, winnerBoard, aiRematch , winnerText, resetMatch } from "./main.js";
import { gameRunning, startGame , games } from "./game.js";
import { getParticepantNames , tempName, player2Name, player1Name, reTournment} from "./tournment.js";

export const reMatch2v2 = document.getElementById('reset2v2') as HTMLButtonElement;
export const paddel3 = document.getElementById("padle3") as HTMLDivElement;
export const paddle3XY = paddel3.getBoundingClientRect() as DOMRect;
export const paddel4 = document.getElementById("padle4") as HTMLDivElement;
export const paddle4XY = paddel4.getBoundingClientRect() as DOMRect;


export async function    startGame2v2(){
    paddel3.style.display = 'flex';
    paddel4.style.display = 'flex';
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