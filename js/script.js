/**
 * gradient background
 * enter the name of player
 * appear configartion when the one of player win
 * give every player color (x is color and o is color)
 * choose paly x compter or player
 * store every point every user
 * desing the interface (https://codepen.io/Sohier99/pen/oNoajBY)
 * draw the game line by line when first run the game
 * the shape of x same as
 * enter the user enter the name the input must have  x or o icon
 * don't write the lines of game horitiltionly
 * every squre have the color of balck and shadow (https://www.youtube.com/watch?v=Ai8oVt9y4us)
 *
 */


/**
 circle: <svg width="100" height="100" viewBox="-50 -50 100 100" className="circle">
      <circle cx="0" cy="0" r="40" />
    </svg>
  cross:
  <svg width="100" height="100" viewBox="-50 -50 100 100" className="cross">
      <line x1="-40" y1="-40" x2="40" y2="40" />
      <line x1="-40" y1="40" x2="40" y2="-40" />
    </svg>
 */

/**
 * dorp menu list: (https://codepen.io/vulchivijay/pen/Bjzrvp)
 */

let board = Array(9).fill(null);
// const board = [null, null, null, null, null, null, null, null, null];

function compose(f, g) {
  return (...arg) => f(g(...arg));
}

const cloneArray = (array) => [...array];

// const changeTurn = (currentPlayer) => {
//   return currentPlayer === 'X' ? 'O' : 'X';
// }

function addXO(newBoard, index, XOturn) {
  // const newBoard = cloneArray(board);
  if (!newBoard[index]) {
    newBoard[index] = XOturn;
    return newBoard;
  }
  console.log('inside addXO: ', newBoard);
  return newBoard;
}

const resetBoard = () => {
  // const board = Array(9).fill(null);
  board = [null, null, null, null, null, null, null, null, null];

  return board;
}


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const winner = (board, winningCombos) => {
  let theWinner;
  winningCombos.forEach((item) => {
    let [a, b, c] = item;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      theWinner = getCurrenPlayer();
    }
  });
  return theWinner;
}

// composed Function
const turn = () => {
  let currentPlayer = 'O';

  const getCurrenPlayer = () => currentPlayer;

  const changeTurn = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return currentPlayer;
  };

  const setTurn = () => currentPlayer = 'O';

  return {
    getCurrenPlayer,
    changeTurn,
    setTurn
  }
}


const { getCurrenPlayer, changeTurn, setTurn } = turn();

// renderFunctions
function renderBoard(board) {
  const boardElm = document.getElementById('board');
  // boardElm.innerHTML = '';
  console.log('board in renderBoard: ' + board);
  board.forEach((item, index) => {
    const elm = document.getElementById(index);
    if (item) {
      elm.innerHTML = item;
    } else {
      elm.innerHTML = '';
    }
  });
}


// handle Click Event
const handleClickEvent = (board, index) => {
  const newBorad = addXO(board, index, changeTurn());
  renderBoard(newBorad);
  const theWinner = winner(newBorad, winningCombos);
  if (theWinner) {
    console.log('the winner is: ' + theWinner);
    const newBoard = resetBoard();
    renderBoard(newBoard);
    setTurn()
  }

}

const boxs = Array.from(document.getElementsByClassName('box'));
boxs.forEach(box => {
  box.addEventListener('click', (event) => handleClickEvent(board, event.target.id))
})





