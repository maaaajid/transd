var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gamesboard, winnerBoard, aiRematch, winnerText, resetMatch, } from "./main.js";
import { gameRunning, startGame, games, paddel3, paddel4 } from "./game.js";
import { getParticepantNames, tempName, player2Name, player1Name, reTournment } from "./tournment.js";
export const reMatch2v2 = document.getElementById('reset2v2');
// let matchUID:string;
export function startGame2v2() {
    return __awaiter(this, void 0, void 0, function* () {
        // try{
        //     matchUID = await getNewMatch(2);
        paddel3.style.display = 'flex';
        paddel4.style.display = 'flex';
        games.gametype = '2v2';
        player2Name.innerText = tempName.p1;
        gamesboard.style.display = 'none';
        winnerBoard.style.display = 'none';
        if (tempName.p2 === '' || tempName.p3 === '' || tempName.p4 === '')
            yield getParticepantNames();
        if (tempName.p2 != '' && tempName.p3 != '' && tempName.p4 != '') {
            player1Name.innerText = tempName.p1 + '\n\n' + tempName.p3;
            player2Name.innerText = tempName.p2 + '\n\n' + tempName.p4;
            document.addEventListener('keyup', game2v2);
        }
        // }catch(e:unknown)
        // {
        //     if (e instanceof Error)
        //     {
        //         console.log(e.message);
        //             // TODO:print error with toast
        //     }
        // }
    });
}
function game2v2(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = 0;
        if (!gameRunning && player2Name.innerText)
            res = yield startGame(event);
        if (res === 3) {
            winnerText.innerText = tempName.p1 + " and " + tempName.p3 + "\nwin";
            // await sendWinOrLose(matchUID, true);
        }
        else if (res === 2) {
            winnerText.innerText = tempName.p2 + " and " + tempName.p4 + "\nwin";
            // await sendWinOrLose(matchUID, false);
        }
        if (res === 2 || res === 3) {
            res = 0;
            reTournment.style.display = 'none';
            aiRematch.style.display = 'none';
            resetMatch.style.display = 'none';
            reMatch2v2.style.display = 'block';
            winnerBoard.style.display = 'flex';
            document.removeEventListener('keyup', game2v2);
        }
    });
}
