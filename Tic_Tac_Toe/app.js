const patternarr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const btnarr = document.querySelectorAll(".boxes");
const state = document.querySelector('.status');
const restart = document.querySelector('.reset');
const startBtn = document.querySelector('.start');

let track = 1;
let board = ["", "", "", "", "", "", "", "", ""];

btnarr.forEach((btn, idx) => {
    btn.addEventListener('click', function (e) {
        if (track) {
            e.target.innerText = "X";
            e.target.style.color = "rgba(0, 234, 255, 0.76)";
            board[idx] = "X";
            track = 0;
        } else {
            e.target.innerText = "O";
            e.target.style.color = "rgba(255, 0, 247, 0.76)";
            board[idx] = "O";
            track = 1;
        }
        e.target.disabled = true;

        if (patternCheck()) {
            state.innerText = `${board[idx]} Won!..`;
            disableAll();
        } else if (board.every(cell => cell !== "")) {
            state.innerText = "It's a draw..";
        } else {
            state.innerText = `Player ${track ? 'X' : 'O'}'s Turn`;
        }
    });
});

const patternCheck = () => {
    return patternarr.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
};

const disableAll = () => {
    btnarr.forEach(btn => {
        btn.disabled = true;
    });
};

const restartGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    btnarr.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
        btn.style.color = "black";
    });
    track = 1;
    state.innerText = "Player X's Turn";
};

const startGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    btnarr.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
        btn.style.color = "black";
    });
    track = 1;
    state.innerText = "Player X's Turn";
};

// Attach buttons
restart.addEventListener("click", restartGame);
startBtn.addEventListener("click", startGame);
