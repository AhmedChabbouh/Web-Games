import Board from "./Board";
import './Game.css'
import Square from "./Square";
import {BoardContext} from "./BoardContext";
import React, { useContext } from 'react';
import { useState,useEffect } from "react";
import Status from "./Status";

const Game=()=>{
    const [score,setScore]=useState([0,0])
    const position = ['top-left', '', 'top-right', '', '', '', 'bottom-left', '', 'bottom-right'];
    const [gameOver, setGameOver] = useState(false);
    const [isBot , setIsBot]=useState(false);
    const {board,setBoard}=useContext(BoardContext);
    const [xTurn,setXTurn]=useState(true);
    const [resultMessage, setResultMessage] = useState('');
    const [resultType, setResultType] = useState('');




    
    const handleClick=(e)=>{
      if(isBot){
        if(xTurn && board[e.target.id]==null ){
          
            makeMove(e.target.id,'X');
            
        }
        else if (xTurn && board[e.target.id]!==null ){alert('this case is not empty')}
        else{alert("it's not your turn you have to wait")}}
      else{
        if(board[e.target.id]==null ){
          
            makeMove(e.target.id,xTurn ? "X":"O");
            
        }
        else if ( board[e.target.id]!==null ){alert('this case is not empty')}
        }

      }

    




    function calculateBotMove(currentBoard) {
  const trios = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
  ];

  for (let trio of trios) {
    if (currentBoard[trio[0]] === 'O' && currentBoard[trio[1]] === 'O' && currentBoard[trio[2]] == null)
      return trio[2];
    else if (currentBoard[trio[2]] === 'O' && currentBoard[trio[1]] === 'O' && currentBoard[trio[0]] == null)
      return trio[0];
    else if (currentBoard[trio[0]] === 'O' && currentBoard[trio[2]] === 'O' && currentBoard[trio[1]] == null)
      return trio[1];}
    for (let trio of trios) {
    if (currentBoard[trio[0]] === 'X' && currentBoard[trio[1]] === 'X' && currentBoard[trio[2]] == null)
      return trio[2];
    else if (currentBoard[trio[2]] === 'X' && currentBoard[trio[1]] === 'X' && currentBoard[trio[0]] == null)
      return trio[0];
    else if (currentBoard[trio[0]] === 'X' && currentBoard[trio[2]] === 'X' && currentBoard[trio[1]] == null)
      return trio[1];
  }
  if(currentBoard[4]==null)
    return 4;

  for (let trio of trios)
  {
     if (currentBoard[trio[2]] === 'O' && currentBoard[trio[1]] == null && currentBoard[trio[0]] == null)
      return Math.random() < 0.5 ? trio[0] : trio[1];
    else if (currentBoard[trio[0]] === 'O' && currentBoard[trio[2]] == null && currentBoard[trio[1]] == null)
      return Math.random() < 0.5 ? trio[2] : trio[1];
    else if (currentBoard[trio[1]] === 'O' && currentBoard[trio[2]] == null && currentBoard[trio[0]] == null)
      return Math.random() < 0.5 ? trio[2] : trio[0];
  }

 
  const emptyIndices = currentBoard
    .map((val, idx) => (val === null ? idx : null))
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) {
    return null;
  }

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}




function reset() {
  setBoard(Array(9).fill(null));
  setXTurn(true);
  setGameOver(false);
   setResultMessage('');
   setResultType('');
   
}




function checkWinner(){
  const newScore=[...score];
  if(
    (board[0]=='X' && board[1]=='X' && board[2]=='X') ||
    (board[3]=='X' && board[4]=='X' && board[5]=='X') ||
    (board[6]=='X' && board[7]=='X' && board[8]=='X') ||
    (board[0]=='X' && board[3]=='X' && board[6]=='X') ||
    (board[1]=='X' && board[4]=='X' && board[7]=='X') ||
    (board[2]=='X' && board[5]=='X' && board[8]=='X') ||
    (board[0]=='X' && board[4]=='X' && board[8]=='X') ||
    (board[2]=='X' && board[4]=='X' && board[6]=='X')
  ) {
    if(isBot){
       setGameOver(true);
    setScore(prev => [prev[0] + 1, prev[1]]);
     setResultMessage('You have won!');
     setResultType('win');}
     else{
      setGameOver(true);
      setScore(prev => [prev[0] + 1, prev[1]]);
      setResultMessage('Red Won');
      setResultType('win');
     }

  }
  else if(
    
    (board[0]=='O' && board[1]=='O' && board[2]=='O') ||
    (board[3]=='O' && board[4]=='O' && board[5]=='O') ||
    (board[6]=='O' && board[7]=='O' && board[8]=='O') ||
    (board[0]=='O' && board[3]=='O' && board[6]=='O') ||
    (board[1]=='O' && board[4]=='O' && board[7]=='O') ||
    (board[2]=='O' && board[5]=='O' && board[8]=='O') ||
    (board[0]=='O' && board[4]=='O' && board[8]=='O') ||
    (board[2]=='O' && board[4]=='O' && board[6]=='O')
  ) {
      if(isBot){ setGameOver(true);
    setScore(prev => [prev[0] , prev[1]+ 1]);
    setResultMessage('You lost!');
    setResultType('lose');}
    else{
      setScore(prev => [prev[0] , prev[1]+ 1]);
      setResultMessage('Blue Won');
      setResultType('win');
      setGameOver(true);
     }

  }
  else if (board.every(cell => cell !== null)) {
    setResultMessage("It's a tie!");
  setGameOver(true);
  setResultType('tie');
}


}




function makeMove(index, sign ){
  if (gameOver) return;

  setBoard(prevBoard => {
    const newBoard = [...prevBoard];
    newBoard[index] = sign;

    
    if (sign === 'X') {
      setXTurn(false);
    } else {
      setXTurn(true);
    }

    return newBoard;
  });
}


useEffect(() => {
  if (gameOver) {
    const timer = setTimeout(() => {
      reset();
    }, 2000); 
    return () => clearTimeout(timer);
  }
}, [gameOver]);


   useEffect(() => {
  if (isBot && !xTurn && !gameOver) {
    const botMoveIndex = calculateBotMove(board);
    if (botMoveIndex !== null && botMoveIndex !== undefined) {
      const timer = setTimeout(() => {
        if (!gameOver) {
          makeMove(botMoveIndex, 'O');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }
}, [xTurn, isBot, gameOver, board]);





    useEffect(() => {
  checkWinner(board);
}, [board]);



function switchBot()
{ setIsBot(!isBot)
  reset();
  setScore([0,0])
}


return(
    <div className={`container ${xTurn ? "red":"blue"}`}>
      <div className={`result-message ${resultType}`}>{resultMessage && <p>{resultMessage}</p>}</div>
      <Status score={score} turn={xTurn} isbot={isBot} />
        <Board>
        {
            board.map((square,index) => <Square id={index} key={index} value={square} position={position[index] } handleClick={handleClick}/>
)
        }
        </Board>
        <div className="Buttons">
        <button className="Reset-button" onClick={()=>{reset();setScore([0,0]);}}>Reset</button>
        <button className="Switch-button" onClick={switchBot}>{isBot ? "Play with a friend": "Play against the bot"}</button>
        </div>
    </div>
)
}

export default Game; 