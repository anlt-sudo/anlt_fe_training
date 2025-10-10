class CaroGame {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.gameActive = true;
    this.score = {
      x: 0,
      o: 0,
      tie: 0,
    };

    // Các tổ hợp thắng có thể
    this.winConditions = [
      [0, 1, 2], // Hàng 1
      [3, 4, 5], // Hàng 2
      [6, 7, 8], // Hàng 3
      [0, 3, 6], // Cột 1
      [1, 4, 7], // Cột 2
      [2, 5, 8], // Cột 3
      [0, 4, 8], // Đường chéo 1
      [2, 4, 6], // Đường chéo 2
    ];

    this.initializeGame();
  }

  initializeGame() {
    this.loadScore();
    this.bindEvents();
    this.updateScoreDisplay();
    this.updatePlayerTurn();
  }

  bindEvents() {
    // Gắn sự kiện click cho các ô
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleCellClick(index));
    });

    // Gắn sự kiện cho các nút
    document
      .getElementById("reset-game")
      .addEventListener("click", () => this.resetGame());
    document
      .getElementById("reset-score")
      .addEventListener("click", () => this.resetScore());
  }

  handleCellClick(index) {
    // Kiểm tra xem ô đã được chọn hay game đã kết thúc chưa
    if (this.board[index] !== "" || !this.gameActive) {
      return;
    }

    // Đánh dấu ô
    this.board[index] = this.currentPlayer;
    this.updateCellDisplay(index);

    // Kiểm tra thắng thua
    if (this.checkWinner()) {
      this.handleGameWin();
    } else if (this.checkTie()) {
      this.handleGameTie();
    } else {
      this.switchPlayer();
    }
  }

  updateCellDisplay(index) {
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = this.currentPlayer;
    cell.classList.add(this.currentPlayer.toLowerCase());
  }

  checkWinner() {
    for (let condition of this.winConditions) {
      const [a, b, c] = condition;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.highlightWinningCells(condition);
        return true;
      }
    }
    return false;
  }

  highlightWinningCells(winningCells) {
    winningCells.forEach((index) => {
      document.querySelector(`[data-index="${index}"]`).classList.add("winner");
    });
  }

  checkTie() {
    return this.board.every((cell) => cell !== "");
  }

  handleGameWin() {
    this.gameActive = false;
    this.score[this.currentPlayer.toLowerCase()]++;
    this.saveScore();
    this.updateScoreDisplay();
    this.showMessage(`🎉 Người chơi ${this.currentPlayer} thắng!`, "winner");
  }

  handleGameTie() {
    this.gameActive = false;
    this.score.tie++;
    this.saveScore();
    this.updateScoreDisplay();
    this.showMessage("🤝 Hòa!", "tie");
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updatePlayerTurn();
  }

  updatePlayerTurn() {
    document.getElementById(
      "current-player"
    ).textContent = `Lượt của: ${this.currentPlayer}`;
  }

  showMessage(text, type) {
    const messageElement = document.getElementById("game-message");
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
  }

  updateScoreDisplay() {
    document.getElementById("score-x").textContent = this.score.x;
    document.getElementById("score-o").textContent = this.score.o;
    document.getElementById("score-tie").textContent = this.score.tie;
  }

  resetGame() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.gameActive = true;

    // Xóa nội dung và class của các ô
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
      cell.className = "cell";
    });

    // Xóa thông báo
    document.getElementById("game-message").textContent = "";
    document.getElementById("game-message").className = "message";

    this.updatePlayerTurn();
  }

  resetScore() {
    this.score = { x: 0, o: 0, tie: 0 };
    this.saveScore();
    this.updateScoreDisplay();
    this.resetGame();
  }

  saveScore() {
    localStorage.setItem("caroScore", JSON.stringify(this.score));
  }

  loadScore() {
    const savedScore = localStorage.getItem("caroScore");
    if (savedScore) {
      this.score = JSON.parse(savedScore);
    }
  }
}

// Khởi tạo game khi trang web được tải
document.addEventListener("DOMContentLoaded", () => {
  new CaroGame();
});

// Thêm hiệu ứng âm thanh (tùy chọn)
function playSound(type) {
  // Có thể thêm âm thanh cho các hành động khác nhau
  // Ví dụ: âm thanh khi click, thắng, thua
  const audio = new Audio();
  switch (type) {
    case "click":
      // audio.src = 'sounds/click.mp3';
      break;
    case "win":
      // audio.src = 'sounds/win.mp3';
      break;
    case "tie":
      // audio.src = 'sounds/tie.mp3';
      break;
  }
  // audio.play().catch(e => console.log('Cannot play sound'));
}
