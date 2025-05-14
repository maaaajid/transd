import { players , gameRunning , startGame, games} from "./game.js";
import { winnerBoard, gamesboard , resetMatch, aiRematch , winnerText, getNewMatch, sendWinOrLose} from "./main.js";
import { player2Name , player1Name, reTournment} from "./tournment.js";


const error =  document.getElementById('error') as HTMLHeadingElement;
const inputName = document.getElementById('inputName') as HTMLInputElement;
const username = document.getElementById('userName') as HTMLDivElement;
const submit = document.getElementById('submit') as HTMLButtonElement 
let matchUid:string;

export async function    game1v1()
{
    try{
        matchUid = await getNewMatch(1);
        games.gametype = '1v1';
        players.player1 = 0;
        players.player2 = 0;
        if (player2Name.innerText === '' || player2Name.innerText === null)
            getUserName(player2Name);
        winnerBoard.style.display = 'none';
        gamesboard.style.display = 'none';
        document.addEventListener('keyup', onevsone);
    }catch(e:unknown)
    {
        if (e instanceof Error)
        {
            console.log(e.message);
                // TODO:print error with toast
        }
    }
}


async function    onevsone(event: KeyboardEvent){

    let res :number = 0;
    if (!gameRunning && player2Name.innerText)
        res = await startGame(event);
    if (res === 3){
        winnerText.innerText = player1Name.innerText + " win";
        await sendWinOrLose(matchUid, true);
    }
    else if (res === 2){
        winnerText.innerText = player2Name.innerText + " win";
        await sendWinOrLose(matchUid, false)
    } 
    
    if (res === 2 || res === 3){
        res = 0;
        reTournment.style.display = 'none';
        aiRematch.style.display = 'none';
        resetMatch.style.display = 'block';
        winnerBoard.style.display = 'flex';
        document.removeEventListener('keyup', onevsone);
    } 
}

function    getUserName(playername: HTMLDivElement)
{
    username.style.display = 'flex';
    submit.addEventListener('click',  (e:MouseEvent) => {
        if (inputName.value === ''){
            e.preventDefault()
            error.innerText = "Enter username";
            error.style.display = "block";
        }
        else if (inputName.value.length > 10){
            e.preventDefault();
            error.innerText = "Too long username";
            error.style.display = "flex";
        }else{
            playername.innerText = inputName.value;
            error.style.display = 'none';
            username.style.display = 'none';
            inputName.value = '';
        }
})}