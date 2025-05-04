// import {  } from "./script.js";
import { player1Name, player2Name, tempName , reTournment, startTournment, tournBoard} from "./tournment.js"
import { gamesboard, winnerBoard, button1v1 } from "./main.js";
import { game1v1 } from "./game1v1.js";


export function    quit()
{
    player1Name.innerText = tempName.p1;
    player2Name.innerText = '';
    tempName.p2 = '', tempName.p3 = '', tempName.p4 = ''
    , tempName.winners[0] = '', tempName.winners[1] = '', tempName.winners[2] = '';
    winnerBoard.style.display = 'none';
    tournBoard.style.display = 'none';
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    reTournment.addEventListener('click', startTournment);
}
