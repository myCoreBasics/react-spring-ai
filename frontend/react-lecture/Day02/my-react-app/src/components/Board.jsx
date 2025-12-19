import React, { useEffect, useState } from 'react';
import Square from './Square';
import '../styles/Board.css';

export default function Board() {
    const [isX, setIsX] = useState(true);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(null));

    useEffect(() => {
        const squares = [];
        for (let i = 1; i <= 20; i++) {
            squares.push(i);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function getRandomSquares() {
            const shuffled = [...squares];
            shuffleArray(shuffled);
            return shuffled.slice(0, 9);
        }

        setTimeout(() => {
            setRandomNumbers(getRandomSquares());
        }, 0);

    }, []);

    function bingGoClick(index) {
        if (board[index]) return;

        const newBoard = board.slice();
        if (isX) {
            newBoard[index] = 'X';
        } else {
            newBoard[index] = 'O';
        }
        setBoard(newBoard);
        setIsX(!isX);
    }
    
    return (
        <div className="board">
            <div className='board-row'>
                <Square number={randomNumbers[0]} handleClick={() => bingGoClick(0)} value={board[0]} />
                <Square number={randomNumbers[1]} handleClick={() => bingGoClick(1)} value={board[1]} />
                <Square number={randomNumbers[2]} handleClick={() => bingGoClick(2)} value={board[2]} />
            </div>
            <div className='board-row'>
                <Square number={randomNumbers[3]} handleClick={() => bingGoClick(3)} value={board[3]} />
                <Square number={randomNumbers[4]} handleClick={() => bingGoClick(4)} value={board[4]} />
                <Square number={randomNumbers[5]} handleClick={() => bingGoClick(5)} value={board[5]} />
            </div>
            <div className='board-row'>
                <Square number={randomNumbers[6]} handleClick={() => bingGoClick(6)} value={board[6]} />
                <Square number={randomNumbers[7]} handleClick={() => bingGoClick(7)} value={board[7]} />
                <Square number={randomNumbers[8]} handleClick={() => bingGoClick(8)} value={board[8]} />
            </div>
        </div>
    );

}