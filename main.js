const playerFirstIndicatorBtn = document.querySelector("#playerFirstIndicator");
const playerSecondIndicatorBtn = document.querySelector("#playerSecondIndicator");
const allGameBoxes = document.querySelectorAll(".game-box");
const resetGamebtn = document.querySelector("#resetGame")
var playerFirstTurn = true;
var playGame = true;

var winnerLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function changePlayerIndicator() {
    playerFirstIndicatorBtn.classList.toggle("btn-success");
    playerFirstIndicatorBtn.classList.toggle("btn-danger");
    playerSecondIndicatorBtn.classList.toggle("btn-success");
    playerSecondIndicatorBtn.classList.toggle("btn-danger");
}

function logPlayersActions(gameBoxIndex) {
    winnerLogic.forEach((winnerLogicItem, index) => {
        var gameBoxItemIndex = winnerLogicItem.indexOf(gameBoxIndex);
        if (gameBoxItemIndex >= 0)
            winnerLogic[index][gameBoxItemIndex] = playerFirstTurn ? "x" : "o";
    })
}

function checkForWinner() {
    var winning = {
        firstPlayerIsWinner: false,
        secondPlayerIsWinner: false
    };

    // winnerLogic.some(winnerLogicItem => {
    //     winning.firstPlayerIsWinner = winnerLogicItem.every(o => o == "x");
    //     winning.secondPlayerIsWinner = winnerLogicItem.every(o => o == "o");
    // })
    for (var i = 0; i < winnerLogic.length; i++) {
        winning.firstPlayerIsWinner = winnerLogic[i].every(o => o == "x");
        winning.secondPlayerIsWinner = winnerLogic[i].every(o => o == "o");
        if (winning.firstPlayerIsWinner || winning.secondPlayerIsWinner) {
            break;
        }
    }

    return winning;
}


function getIconForGameBox() {
    return playerFirstTurn ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-o"></i>';
}

allGameBoxes.forEach((btnItem, index) => {
    btnItem.id = index;
    btnItem.addEventListener("click", function () {
        if (this.innerHTML.length == 0 && playGame) {
            this.innerHTML = getIconForGameBox();
            logPlayersActions(Number(this.id));
            playerFirstTurn = !playerFirstTurn;
            changePlayerIndicator();
            var weHaveWinner = checkForWinner();
            if (weHaveWinner.firstPlayerIsWinner) {
                swal("Player first");
                playGame = false;
            } else if (weHaveWinner.secondPlayerIsWinner) {
                swal("Player second");
                playGame = false;
            }
        }
    });
});



function resetPlayerIndicators() {
    playerFirstIndicatorBtn.classList.add("btn-success");
    playerFirstIndicatorBtn.classList.remove("btn-danger");
    playerSecondIndicatorBtn.classList.remove("btn-success");
    playerSecondIndicatorBtn.classList.add("btn-danger");
}

resetGamebtn.addEventListener("click", function () {
    allGameBoxes.forEach(item => { item.innerHTML = "" });
    playGame = true;
    playerFirstTurn = true;
    resetPlayerIndicators();
    winnerLogic = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
})