let turn = "X";
let cells = [];
let gameOver = false; 
let start =true;
function checkWinner() {
    start=false;
    let isDraw = true; // Assume it's a draw unless we find an empty cell
    for (let i = 1; i < 10; i++) {
        cells[i] = document.getElementById("cell" + i).innerHTML;
        if (cells[i] === "") {
            isDraw = false; // If an empty cell is found, it's not a draw yet
        }
    }

    let winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
        [1, 5, 9], [3, 5, 7]             // diagonals
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (cells[a] === cells[b] && cells[b] === cells[c] && cells[a] !== "") {
            let audio =new Audio("audio/win.mp3")
            audio.play()
            highlightWinner([a, b, c]);
            document.querySelector(".player").innerHTML = `<h2>${cells[a]} Wins!</h2>`;
            document.getElementById("reset").classList.add("hidden");
            gameOver = true;
            return;
        }
    }

    // If no winner and all cells are filled, declare a draw
    if (isDraw) {
        let audio3=new Audio("audio/game-over.mp3")
        audio3.play()
        document.getElementById("reset").classList.add("hidden");
        document.querySelector(".player").innerHTML = `<h2>It's a Draw!</h2>`;
        gameOver = true;
    }
}


function highlightWinner(winningCells) {
    for (let i of winningCells) {
        document.getElementById("cell" + i).classList.add("winner"); 
    }
}

function game(id) {
    let audio2=new Audio("audio/click.mp3")
    audio2.play()
    if (gameOver) return;

    let element = document.getElementById(id);
    if (element.innerHTML === "") {
        element.innerHTML = turn;
        turn = (turn === "X") ? "O" : "X";
        updateTurnDisplay(); 
        checkWinner();
    }
}

// change color for current player
function updateTurnDisplay() {
    document.querySelector(".player").innerHTML =`<h2><span id="oTurn" >O</span> vs <span id="xTurn">X</span></h2>`
    let xElement = document.getElementById("xTurn");
    let oElement = document.getElementById("oTurn");

    if (turn === "X" && start) {
        xElement.style.color = "white";
        oElement.style.color = "white"; 
    } else if(turn === "O") {
        xElement.style.color = "gray";
        oElement.style.color = "white";
    }
    else{
        xElement.style.color = "white";
        oElement.style.color = "gray"; 
    }
}

function resetGame() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("cell" + i).innerHTML = "";
        document.getElementById("cell" + i).classList.remove("winner");
        document.getElementById("reset").classList.remove("hidden");

    }
    turn = "X";
    gameOver = false;
    start=true;
    updateTurnDisplay();
}
