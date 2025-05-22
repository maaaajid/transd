import { startTournment, reTournment } from "./tournment.js";
import { quit } from "./quit.js";
import { game1v1 } from "./game1v1.js";
import { startAiGame } from "./ai.js";
import { startGame2v2, reMatch2v2 } from "./game2v2.js";
import { resizeGame, paddel3, paddel4 } from "./game.js";
export const gamesboard = document.getElementById('games');
export const winnerBoard = document.getElementById('frame2');
export const button1v1 = document.getElementById('v1');
export const resetMatch = document.getElementById('resetMatch');
export const winnerText = document.getElementById('winnerText');
export const username = document.getElementById('userName');
export const aiButton = document.getElementById('AI');
export const tournment = document.getElementById('tournment');
export const aiRematch = document.getElementById('resetMatchAi');
export const game2v2 = document.getElementById('V2');
const quitGame = document.getElementById('quit');
resizeGame();
winnerBoard.style.display = 'none';
quitGame.addEventListener('click', quit);
resetMatch.addEventListener('click', game1v1);
aiRematch.addEventListener('click', startAiGame);
reTournment.addEventListener('click', startTournment);
reMatch2v2.addEventListener('click', startGame2v2);
window.addEventListener('resize', resizeGame);
gameMenu();
// export async  function getNewMatch(type:number) :Promise<string>{
//     let res = await fetch(
//         `https://transcendence.fr/api/match/create?match_type=${type}`, {method:"POST",body:new FormData()});
//         if (!res.ok){
//             throw Error(await res.text());
//         }
//         let uid = await res.text();
//         console.log(uid);
//         return (uid);
// }
// export async function sendWinOrLose(uid:string, win:boolean) :Promise<void>{
//     let status = "https://transcendence.fr/api/match/win";
//     if (!win)
//         status = "https://transcendence.fr/api/match/lose";
//     let theForm = new FormData();
//     theForm.append("uid", uid)
//     try{
//         let res = await fetch(status, {method:"POST", body:theForm});
//         if (!res.ok)
//             throw Error(await res.text());
//     }catch(e){
//         console.log(e);
//     }
//     return;
// }
export function gameMenu() {
    paddel3.style.display = 'none';
    paddel4.style.display = 'none';
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    tournment.addEventListener('click', startTournment);
    aiButton.addEventListener('click', startAiGame);
    game2v2.addEventListener('click', startGame2v2);
}
