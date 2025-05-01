import { startGame , gameRunning , players} from "./script.js";

const gamesboard = document.getElementById('games');
const button1v1 = document.getElementById('v1');
const winnerBoard  = document.getElementById('frame2');
const winnerText = document.getElementById('winnerText');
const resetMatch = document.getElementById('resetMatch');
const quitGame = document.getElementById('quit');
winnerBoard.style.display = 'none';
window.addEventListener('DOMContentLoaded', () => {
    resetMatch.addEventListener('click', game1v1);
    button1v1.addEventListener('click', game1v1);
});
quitGame.addEventListener('click', quit);
// resetMatch.addEventListener('click', game1v1);
// button1v1.addEventListener('click', game1v1);

function    quit()
{
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'flex';
    button1v1.addEventListener('click', game1v1);

}


function    game1v1()
{
    players.player1 = 0;
    players.player2 = 0;
    let winner = 0;
    winnerBoard.style.display = 'none';
    gamesboard.style.display = 'none';
    document.addEventListener('keyup', (event) => {
        if (!gameRunning)
        {
            let winner = startGame(event);
        }
        console.log(winner);
        
        if (players.player1 === 3)
            {
                winnerBoard.style.display = 'flex';
                winnerText.innerText = "player 1 win";
            }
            else if (players.player2 === 3)
        {
            winnerBoard.style.display = 'flex';
            winnerText.innerText = "player 2 win";
        }

        
})}


