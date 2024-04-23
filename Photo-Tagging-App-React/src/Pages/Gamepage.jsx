// IMPORTS 
// React 
import { useState, useEffect } from 'react'
// RRD 
import { createRoot } from 'react-dom/client';
// Styles
import './Gamepage.css'

// Components
import { Selecter } from '../Components/Selecter'
import { Circle } from '../Components/Circle';



// COMPONTENT

export const Gamepage = ({ setGameState }) => {

    // STATES
    const [circlePageX, setCirclePageX] = useState("")
    const [circlePageY, setCirclePageY] = useState("")
    const [circleShowing, setCircleShowing] = useState('none')

    const handleGridClick = (e) => {
        setCirclePageX(e.pageX - 25)
        setCirclePageY(e.pageY - 25)
        setCircleShowing('block')
    };




    // Create cells
    const cells = [];
    for (let i = 0; i < 5247; i++) {
        // Push each child div into the array
        cells.push(<div onClick={handleGridClick} className='Cell' key={i} id={i}></div>);
    }

    return (
        <div className='Gamepage'>

            <Circle circlePageX={circlePageX} circlePageY={circlePageY} circleShowing={circleShowing} />
            <img className='GameIMG' src='/Game image.jpg' alt='Game image'></img>
            <div className='Coordinates'>
                {cells}
            </div>




            {/* <div className='Test'>NINER</div> */}

            <div className='Gamepage-Controlls-island'>
                <div className='Gamepage-Character-Bubble'>
                    <img src='/PngItem_26692.png' alt='Tom'></img>
                </div>
                <div className='Gamepage-Character-Bubble'>
                    <img src='/pngwing.com-2.png' alt='Spiderman'></img>
                </div>
                <div className='Gamepage-Character-Bubble'>
                    <img src='/pngwing.com.png' alt='Kenny'></img>
                </div>
                <div className='Gamepage-Character-Bubble'>
                    <img src='/Roger-American-Dad-PNG-Photos.png' alt='Roger'></img>
                </div>
                <div className='Gamepage-Character-Bubble'>
                    <img src='/pngwing.com-3.png' alt=''></img>
                </div>
            </div>

        </div>
    )
}