import { startTournment , reTournment} from "./tournment.js";
import { quit } from "./quit.js";
import { game1v1 } from "./game1v1.js"
import { startAiGame } from "./ai.js";

export const gamesboard = document.getElementById('games');
export const winnerBoard  = document.getElementById('frame2');
export const button1v1 = document.getElementById('v1');
export const resetMatch = document.getElementById('resetMatch');
export const winnerText = document.getElementById('winnerText');
export const username = document.getElementById('userName');
export const aiButton = document.getElementById('AI')
export const tournment = document.getElementById('tournment');
export const aiRematch = document.getElementById('resetMatchAi');
const quitGame = document.getElementById('quit');


winnerBoard.style.display = 'none';
quitGame.addEventListener('click', quit);
resetMatch.addEventListener('click', game1v1);
aiRematch.addEventListener('click', startAiGame);
reTournment.addEventListener('click', startTournment);

gameMenu();

export function    gameMenu()
{
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    tournment.addEventListener('click', startTournment);
    aiButton.addEventListener('click', startAiGame);
}

