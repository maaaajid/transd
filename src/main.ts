import { startTournment , reTournment} from "./tournment.js";
import { quit } from "./quit.js";
import { game1v1 } from "./game1v1.js"
import { startAiGame } from "./ai.js";

export const gamesboard = document.getElementById('games') as HTMLDivElement;
export const winnerBoard  = document.getElementById('frame2') as HTMLDivElement;
export const button1v1 = document.getElementById('v1') as HTMLDivElement;
export const resetMatch = document.getElementById('resetMatch') as HTMLButtonElement;
export const winnerText = document.getElementById('winnerText') as HTMLHeadingElement;
export const username = document.getElementById('userName') as HTMLDivElement;
export const aiButton = document.getElementById('AI') as HTMLButtonElement
export const tournment = document.getElementById('tournment') as HTMLButtonElement;
export const aiRematch = document.getElementById('resetMatchAi') as HTMLButtonElement;
const quitGame = document.getElementById('quit') as HTMLButtonElement;


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

