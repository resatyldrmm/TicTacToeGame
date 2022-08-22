import React, { useState } from 'react'
import './Tictactoe.css';

const Tictactoe = () => {
    const [winner, setWinner] = useState();
    const [turn, setTurn] = useState('X');
    const [boxes, setBoxes] = useState(Array(9).fill(''));

    const playAgain = () => {
        setWinner(null)
        setBoxes(Array(9).fill(''))
    }

    const checkWinner = (squares) => {
        let winnerCombos = {
            row: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            column: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }
        for (let combo in winnerCombos) {
            winnerCombos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) { }
                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]])
                }
            });
        }
    }


    const handleClick = (ind) => {

        if (boxes[ind] !== '' || winner) {
            //alert('already clicked') || X/O won and game finished.
            return;
        }


        let squares = [...boxes]
        if (turn === 'X') {
            squares[ind] = 'X'
            setTurn('O')
        } else {
            squares[ind] = 'O'
            setTurn('X')
        }
        setBoxes(squares)
        checkWinner(squares)
    }

    const Box = ({ ind }) => {
        return (
            <td onClick={() => handleClick(ind)}>{boxes[ind]}</td>
        )
    }

    return (
        <div className='container'>
            {!winner && (
                <h2>Turn : {turn} Player</h2>
            )}
            <table>
                <tbody>
                    <tr>
                        <Box ind={0} />
                        <Box ind={1} />
                        <Box ind={2} />
                    </tr>
                    <tr>
                        <Box ind={3} />
                        <Box ind={4} />
                        <Box ind={5} />
                    </tr>
                    <tr>
                        <Box ind={6} />
                        <Box ind={7} />
                        <Box ind={8} />
                    </tr>
                </tbody>
            </table>
            {!boxes.includes('') && !winner && (
                <>
                    <h1> Draw </h1>
                    <button className='button-playagain' onClick={() => playAgain()}>Play Again</button>
                </>
            )}
            {winner && (
                <>
                    <h1> Winner : {winner} Player </h1>
                    <button className='button-playagain' onClick={() => playAgain()}>Play Again</button>
                </>
            )}
        </div >
    )
}

export default Tictactoe