import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./tictactoegame.css";

const TicTacToeGame = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { width, height } = useWindowSize();

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, bIndex, c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        setWinner(b[a]);
        setShowPopup(true);
        return;
      }
    }
    if (!b.includes(null)) {
      setWinner("Draw");
      setShowPopup(true);
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setIsXTurn(true);
    setWinner(null);
    setShowPopup(false);
  };

  return (
    <div className="game-container">
      {winner && winner !== "Draw" && <Confetti width={width} height={height} />}
      
      <div className="game-box">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="game-title"
        >
          Tic-Tac-Toe
        </motion.h1>
  
        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className="cell"
              data-symbol={cell || ""}
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
  
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>
              {winner === "Draw" ? "It's a Draw!" : `🎉 ${winner} Wins! 🎉`}
            </h2>
            <button className="restart-button" onClick={resetGame}>
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default TicTacToeGame;
