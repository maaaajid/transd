import { gamesboard, winnerBoard, aiRematch , winnerText, resetMatch} from "./main.js";
import { gameRunning, startGame , games } from "./game.js";

export const tournBoard = document.getElementById('tournamentBoard') as HTMLDivElement;
export const player1Name = document.getElementById('player1name') as HTMLDivElement;
export const player2Name = document.getElementById('player2name') as HTMLDivElement;
export const reTournment = document.getElementById('restartTournment') as HTMLButtonElement;
const tournmentNames = document.getElementById('tournmentNames') as HTMLDivElement;
const error2 = document.getElementById('error2') as HTMLHeadingElement;
const inputName2 = document.getElementById('inputName2') as HTMLInputElement;
const inputName3 = document.getElementById('inputName3') as HTMLInputElement;
const inputName4 = document.getElementById('inputName4') as HTMLInputElement;
const submitUsers = document.getElementById('submitUsers') as HTMLButtonElement;
const tb1 = document.getElementById('p1') as HTMLDivElement;
const tb2 = document.getElementById('p2') as HTMLDivElement;
const tb3 = document.getElementById('p3') as HTMLDivElement;
const tb4 = document.getElementById('p4') as HTMLDivElement;
const tb5 = document.getElementById('p5') as HTMLDivElement;
const tb6 = document.getElementById('p6') as HTMLDivElement;
const tb7 = document.getElementById('p7') as HTMLDivElement;


export const tempName: {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  winners: string[];
} = {
  p1: player1Name.innerText,
  p2: '',
  p3: '',
  p4: '',
  winners: []
};

// let matchUID:string;

reTournment.addEventListener('click', startTournment);

export async function    startTournment()
{
    // try{
    //     matchUID = await getNewMatch(4);
        games.gametype = 'tournment';
        player1Name.innerText = tempName.p1;
        tempName.winners[0] = '', tempName.winners[1] = '', tempName.winners[2] = '';
        tb5.innerText = '', tb6.innerText = '', tb7.innerText = '';
        tb1.style.opacity = '1', tb2.style.opacity = '1', tb3.style.opacity = '1',
        tb4.style.opacity = '1', tb5.style.opacity = '1', tb6.style.opacity = '1', tb7.style.opacity = '1', 
        gamesboard.style.display = 'none';
        winnerBoard.style.display = 'none';
        tournBoard.style.display = 'none';
        
        if (tempName.p2 === ''  || tempName.p3 === '' || tempName.p4 === '')
            await getParticepantNames();
        if (tempName.p2 != '' &&  tempName.p3 != '' && tempName.p4 != ''){
            player1Name.innerText = tempName.p1;
            player2Name.innerText = tempName.p2;
            tournBoard.style.display = 'flex';
            document.addEventListener('keyup',  firstRound);
        }
    // }catch(e:unknown)
    // {
    //     if (e instanceof Error)
    //     {
    //         console.log(e.message);
    //             // TODO:print error with toast
    //     }
    // }
}

async function firstRound(event: KeyboardEvent) {
    let res;
    if (!gameRunning) {
        
            res = await startGame(event);
        if (res === 3)
            tempName.winners[0] = tempName.p1, tb2.style.opacity = '0.3';
        else if (res === 2)
            tempName.winners[0] = tempName.p2, tb1.style.opacity = '0.3';
        if (tempName.winners[0]){
            player1Name.innerText = tempName.p3;
            player2Name.innerText = tempName.p4;
            tb6.innerText = tempName.winners[0];
        }
        if (tempName.winners[0]){
            res = 0;
            document.removeEventListener('keyup', firstRound);
            document.addEventListener('keyup', secondRound);
        }     
    }
}

async function secondRound(event: KeyboardEvent) {
    let res;
    if (!gameRunning && tempName.winners[0]){
        res = await startGame(event);
        if (res === 3)
            tempName.winners[1] = tempName.p3, tb4.style.opacity = '0.3';
        else if (res === 2)
            tempName.winners[1] = tempName.p4, tb3.style.opacity = '0.3';
        if (tempName.winners[0] && tempName.winners[1]){
            player1Name.innerText = tempName.winners[0];
            player2Name.innerText = tempName.winners[1];
            tb5.innerText = tempName.winners[1];
        }
    }
    if (tempName.winners[0] && tempName.winners[1]){
        document.removeEventListener('keyup', secondRound);
        document.addEventListener('keyup', finnalRound);
    }
} 

async function finnalRound(event: KeyboardEvent) {
    let res;
    if (!gameRunning && tempName.winners[1]){
        res = await startGame(event);
        if (res === 3){
            tempName.winners[2]= tempName.winners[0], tb5.style.opacity = '0.3'
            , tb4.style.opacity = '0.3', tb3.style.opacity = '0.3';
            // await sendWinOrLose(matchUID, true);
        }
        else if (res === 2){
            tempName.winners[2] = tempName.winners[1], tb6.style.opacity = '0.3'
            , tb2.style.opacity = '0.3', tb1.style.opacity = '0.3';
            // await sendWinOrLose(matchUID, false);
        }
    }
    if (tempName.winners[2])
    {
        res = 0;
        
        document.removeEventListener('keyup', finnalRound); 
        tb7.innerText = tempName.winners[2];
        winnerText.innerText = tempName.winners[2] +  " win";
        resetMatch.style.display = 'none';
        reTournment.style.display = 'block';
        document.addEventListener('keyup', removeTBoard);
    }}
    
function removeTBoard(event: KeyboardEvent) {
    if (event.code === 'Space'){
        tournBoard.style.display = 'none';
        aiRematch.style.display = 'none';
        winnerBoard.style.display = 'flex';
        document.removeEventListener('keyup', removeTBoard);
}}

export function getParticepantNames(): Promise<void> {
    return new Promise((resolve:(value: void) => void) => {
      tournmentNames.style.display = 'flex';
  
      function handleSubmit(e: MouseEvent) {
        e.preventDefault();
        if (inputName2.value === '' ||
          inputName3.value === '' ||
          inputName4.value === ''
        ) {
          error2.innerText = "All participants should have a username";
          error2.style.display = "block";
        } else if (inputName2.value.length > 10 ||
          inputName3.value.length > 10 ||
          inputName4.value.length > 10
        ) {
          error2.innerText = "Too long username";
          error2.style.display = "block";
        } else {
          tempName.p2 = inputName2.value;
          tempName.p3 = inputName3.value;
          tempName.p4 = inputName4.value;
  
          error2.style.display = 'none';
          tournmentNames.style.display = 'none';
          submitUsers.removeEventListener('click', handleSubmit);
          inputName2.value = '';
          inputName3.value = '';
          inputName4.value = '';
          tb1.innerText = tempName.p1;
          tb2.innerText = tempName.p2;
          tb3.innerText = tempName.p3;
          tb4.innerText = tempName.p4;
          resolve();
        }
      }
      submitUsers.addEventListener('click', handleSubmit);
})}