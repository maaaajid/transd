var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { players, gameRunning, startGame, games } from "./game.js";
import { winnerBoard, gamesboard, resetMatch, aiRematch, winnerText } from "./main.js";
import { player2Name, player1Name, reTournment } from "./tournment.js";
export function startAiGame() {
    return __awaiter(this, void 0, void 0, function* () {
        games.gametype = 'AI';
        players.player1 = 0;
        players.player2 = 0;
        player2Name.innerText = 'ROBOTOMAS';
        winnerBoard.style.display = 'none';
        gamesboard.style.display = 'none';
        document.addEventListener('keyup', aiGame);
    });
}
function aiGame(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = 0;
        if (!gameRunning)
            res = yield startGame(event);
        if (res === 3)
            winnerText.innerText = player1Name.innerText + " win";
        else if (res === 2)
            winnerText.innerText = player2Name.innerText + " win";
        if (res === 2 || res === 3) {
            res = 0;
            reTournment.style.display = 'none';
            resetMatch.style.display = 'none';
            aiRematch.style.display = 'block';
            winnerBoard.style.display = 'flex';
            document.removeEventListener('keyup', aiGame);
        }
    });
}
