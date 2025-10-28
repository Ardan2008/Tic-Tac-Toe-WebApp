const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  winText = document.querySelector(".win-text"),
  replayBtn = document.querySelector(".btn button");

let playerXIcon = "fa-solid fa-xmark";
let playerOIcon = "fa-regular fa-circle";
let playerSign = "X"; // simbol pemain saat ini
let runBot = true;

window.onload = () => {
  allBox.forEach((box) => box.setAttribute("onclick", "clickedBox(this)"));

  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  };

  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("player"); // player memilih O
  };
};

// klik pemain
function clickedBox(element) {
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    element.setAttribute("id", "O");
    playerSign = "O";
    players.classList.remove("active");
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    element.setAttribute("id", "X");
    playerSign = "X";
    players.classList.add("active");
  }

  element.style.pointerEvents = "none";
  checkWinner(playerSign);

  playBoard.style.pointerEvents = "none";

  let delay = (Math.random() * 800 + 200).toFixed();
  setTimeout(() => {
    botTurn();
  }, delay);
}

// giliran bot
function botTurn() {
  if (!runBot) return;

  let emptyBoxes = [...allBox].filter((box) => box.childElementCount === 0);
  if (emptyBoxes.length === 0) return;

  let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

  if (players.classList.contains("player")) {
    // pemain O → bot X
    randomBox.innerHTML = `<i class="${playerXIcon}"></i>`;
    randomBox.setAttribute("id", "X");
    playerSign = "X";
    players.classList.add("active");
  } else {
    // pemain X → bot O
    randomBox.innerHTML = `<i class="${playerOIcon}"></i>`;
    randomBox.setAttribute("id", "O");
    playerSign = "O";
    players.classList.remove("active");
  }

  randomBox.style.pointerEvents = "none";
  checkWinner(playerSign);
  playBoard.style.pointerEvents = "auto";
}

// ambil ID kotak
function getId(num) {
  return document.querySelector(".box" + num).id;
}

// cek apakah 3 kotak sebaris punya simbol yang sama
function checkCombo(a, b, c, sign) {
  return getId(a) === sign && getId(b) === sign && getId(c) === sign;
}

// cek pemenang
function checkWinner(sign) {
  if (
    checkCombo(1, 2, 3, sign) ||
    checkCombo(4, 5, 6, sign) ||
    checkCombo(7, 8, 9, sign) ||
    checkCombo(1, 4, 7, sign) ||
    checkCombo(2, 5, 8, sign) ||
    checkCombo(3, 6, 9, sign) ||
    checkCombo(1, 5, 9, sign) ||
    checkCombo(3, 5, 7, sign)
  ) {
    runBot = false;
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
      winText.innerHTML = `Player <p>${sign}</p> win the game!`;
    }, 700);
  } else if ([...allBox].every((b) => b.childElementCount !== 0)) {
    runBot = false;
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
      winText.textContent = "Match has been drawn!";
    }, 700);
  }
}

// tombol replay
replayBtn.onclick = () => {
  window.location.reload();
};
