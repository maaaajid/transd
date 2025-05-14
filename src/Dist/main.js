var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export function getNewMatch(type) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`https://transcendence.fr/api/match/create?match_type=${type}`, { method: "POST", body: new FormData() });
        if (!res.ok) {
            throw Error(yield res.text());
        }
        let uid = yield res.text();
        console.log(uid);
        return (uid);
    });
}
export function sendWinOrLose(uid, win) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = "https://transcendence.fr/api/match/win";
        if (!win)
            status = "https://transcendence.fr/api/match/lose";
        let theForm = new FormData();
        theForm.append("uid", uid);
        try {
            let res = yield fetch(status, { method: "POST", body: theForm });
            if (!res.ok)
                throw Error(yield res.text());
        }
        catch (e) {
            console.log(e);
        }
        return;
    });
}
export function gameMenu() {
    paddel3.style.display = 'none';
    paddel4.style.display = 'none';
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);
    tournment.addEventListener('click', startTournment);
    aiButton.addEventListener('click', startAiGame);
    game2v2.addEventListener('click', startGame2v2);
}
