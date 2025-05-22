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
const error = document.getElementById('error');
const inputName = document.getElementById('inputName');
const username = document.getElementById('userName');
const submit = document.getElementById('submit');
// let matchUid:string;
export function game1v1() {
    return __awaiter(this, void 0, void 0, function* () {
        // try{
        //     matchUid = await getNewMatch(1);
        games.gametype = '1v1';
        players.player1 = 0;
        players.player2 = 0;
        if (player2Name.innerText === '' || player2Name.innerText === null)
            getUserName(player2Name);
        winnerBoard.style.display = 'none';
        gamesboard.style.display = 'none';
        document.addEventListener('keyup', onevsone);
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
function onevsone(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = 0;
        if (!gameRunning && player2Name.innerText)
            res = yield startGame(event);
        if (res === 3) {
            winnerText.innerText = player1Name.innerText + " win";
            // await sendWinOrLose(matchUid, true);
        }
        else if (res === 2) {
            winnerText.innerText = player2Name.innerText + " win";
            // await sendWinOrLose(matchUid, false)
        }
        if (res === 2 || res === 3) {
            res = 0;
            reTournment.style.display = 'none';
            aiRematch.style.display = 'none';
            resetMatch.style.display = 'block';
            winnerBoard.style.display = 'flex';
            document.removeEventListener('keyup', onevsone);
        }
    });
}
function getUserName(playername) {
    username.style.display = 'flex';
    submit.addEventListener('click', (e) => {
        if (inputName.value === '') {
            e.preventDefault();
            error.innerText = "Enter username";
            error.style.display = "block";
        }
        else if (inputName.value.length > 10) {
            e.preventDefault();
            error.innerText = "Too long username";
            error.style.display = "flex";
        }
        else {
            playername.innerText = inputName.value;
            error.style.display = 'none';
            username.style.display = 'none';
            inputName.value = '';
        }
    });
}
