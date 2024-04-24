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
    // Game function States 
    const [selectedCell, setSelectedCell] = useState('')
    const [selectedCharacter, setSelectedCharacter] = useState('') 

    const [tomFound, setTomFound] = useState(false);
    const [spidermanFound, setSpidermanFound] = useState(false);
    const [kennyFound, setKennyFound] = useState(false);
    const [rogerFound, setRogerFound] = useState(false);
    const [brianFound, setBrianFound] = useState(false);
    
    // DLEETE ME - UE TO LOG SLEECETD CHARACTER ON CHANGE STATE //
    useEffect(() => { 
        console.log("UE char " + selectedCharacter)
        console.log("UE cell " + selectedCell)
    }, [selectedCharacter, selectedCell])
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

        // Set selected Cell for backend
        setSelectedCell(e.target.id)

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
            <Selecter 
            selectedCell={selectedCell} 
            selectedCharacter={selectedCharacter} 
            setSelectedCharacter={setSelectedCharacter} 
            setSelectedCell={setSelectedCell} 
            setCircleShowing={setCircleShowing} 
            selecterVisible={selecterVisible} 
            setSelecterVisible={setSelecterVisible}
            tomFound={tomFound}
            setTomFound={setTomFound}
            spidermanFound={spidermanFound}
            setSpidermanFound={setSpidermanFound}
            kennyFound={kennyFound}
            setKennyFound={setKennyFound}
            rogerFound={rogerFound}
            setRogerFound={setRogerFound}
            brianFound={brianFound}
            setBrianFound={setBrianFound}
            />
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