import { startTournment } from "./tournment.js";
import { quit } from "./quit.js";
import { game1v1 } from "./game1v1.js"

export const gamesboard = document.getElementById('games');
export const winnerBoard  = document.getElementById('frame2');
export const button1v1 = document.getElementById('v1');
export const resetMatch = document.getElementById('resetMatch');
const winnerText = document.getElementById('winnerText');
const quitGame = document.getElementById('quit');
const tournment = document.getElementById('tournment');
const username = document.getElementById('userName');


winnerBoard.style.display = 'none';
quitGame.addEventListener('click', quit);
resetMatch.addEventListener('click', game1v1);

gameMenu();

export function    gameMenu()
{
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    tournment.addEventListener('click', startTournment);
}

