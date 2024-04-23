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



    const [screenWidth, setScreenWidth] = useState(window.innerWidth);






    // STATES
    // Game function States 
    const [selectedCell, setSelectedCell] = useState('')

    // Selecter States
    const [selecterVisible, setSelecterVisible] = useState(false);

    // Cirlce States
    const [circlePageX, setCirclePageX] = useState("")
    const [circlePageY, setCirclePageY] = useState("")
    const [circleShowing, setCircleShowing] = useState('none')

    const handleGridClick = (e) => {
        // Check if screen width is under 600px
        const isSmallScreen = window.innerWidth < 600;
        // Set the offset value based on screen size
        const offsetValue = isSmallScreen ? 13 : 25;
        // Set circle position 
        setCirclePageX(e.pageX - offsetValue);
        setCirclePageY(e.pageY - offsetValue);
        setCircleShowing('block');
        // Open up the selecter
        setSelecterVisible(true)




        // Set the selected grid cell ID number (and surrounding cells) 
        console.log(e.target.id)

    };




    // Create cells
    const cells = [];
    for (let i = 0; i < 5247; i++) {
        // Push each child div into the array
        cells.push(<div onClick={handleGridClick} className='Cell' key={i} id={i}></div>);
    }

    return (
        <div className='Gamepage'>
            {/* Hightlight circle */}
            <Circle circlePageX={circlePageX} circlePageY={circlePageY} circleShowing={circleShowing} />
            {/* drop down selecter */}
            <Selecter setCircleShowing={setCircleShowing} selecterVisible={selecterVisible} setSelecterVisible={setSelecterVisible}/>
            {/* game image */}
            <img className='GameIMG' src='/Game image.jpg' alt='Game image'></img>
            {/* cell grids */}
            <div className='Coordinates'>
                {cells}
            </div>





            {/* <div className='Gamepage-Controlls-island'>
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
            </div> */}

        </div>
    )
}