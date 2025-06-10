//oyun tahtasındaki tum hucreleri  secer
const cells = document.querySelectorAll(".cell");
//oyun durumu mesajını gosterecek oge
const message = document.getElementById("message");

//şu anki oyuncuyu belirlemek için degşsken olusturuldu
let currentPlayer = "X";

//oyun tahtasını temsil eden dizi ve baslangıcta bosluklarla doldurulur
let gameBoard = ["", "", "", "", "", "", "", "", ""];

//oyun bitiş durumu icin
let gameIsOver = false;

// kazanma durumlarını kontrol eden fonksiyon
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattenrn of winPatterns) {
    //mevcut kazanma durumunun hucreindislerini ayrıştırır
    const [a, b, c] = pattenrn;

    //eger aynı oyuncunun işareti üç hücrede aynıysa, oyunu kazanan oyuncuyu belirler
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameIsOver = true;
      message.textContent = `${currentPlayer} kazandı!`;

      //kazanan hucreleri renklendirir
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return;
    }
  }

  //eger oyun tahtası doluysa ve kazanan yoksa berabere biter
  if(!gameBoard.includes("")){
    gameIsOver = true;
    message.textContent = "oyun berabere!";
    cells.forEach((cell) => {
        cell.classList.add("draw","white");
    })
  }
}


//oyuncunun hamle yapmasını saglayan fonksiyon

function makeMove(cellIndex){
    //eger hucre bossa ve oyun bitmemişse hamle yapılır
    if(!gameBoard[cellIndex] && !gameIsOver){
        //hğcreye mevcut oyuncunun işaretini ekler
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer);

        //kazanma durumu kontrolu
        checkWin();

        //oyuncu degistirme
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

//oyunu restartlama
function restartGame(){
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameIsOver = false;
    message.textContent = "";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("win","X","O","draw","white");
    })
}