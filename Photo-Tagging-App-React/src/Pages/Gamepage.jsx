// IMPORTS 
// React 
import { useState, useEffect } from 'react'
// RRD 
import { createRoot } from 'react-dom/client';
// Styles
import './Gamepage.css'

// Components
import { Selecter } from '../Components/Selecter'



// COMPONTENT

export const Gamepage = ({ setGameState }) => {

    // STATES
    // const [popupDisplay, setPopupDisplay] = useState("none")
    // const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const handleGridClick = (e) => {
        // Color the cell red
        e.target.style.backgroundColor = 'red';
    
        // Set cell overflow property to visible
        e.target.style.overflow = 'visible';
    
        // Show popup display 
        // setPopupDisplay('block');
    
        // Add contents into the cell
        const selecterDiv = document.createElement('div');
        selecterDiv.className = 'SelecterDiv';
        selecterDiv.style.display = 'block'; // Apply popup display style
        selecterDiv.style.position = 'absolute'; // Apply position style
        selecterDiv.style.bottom = '0px'; // Apply position style
        selecterDiv.style.position = 'absolute'; // Apply position style
    
        // Render Selecter component inside selecterDiv using createRoot
        const root = createRoot(selecterDiv);
        root.render(<Selecter />);
    
        // Append the SelecterDiv to the clicked cell
        e.target.appendChild(selecterDiv);
    };



    // Create cells
    const cells = [];
    for (let i = 0; i < 5247; i++) {
        // Push each child div into the array
        cells.push(<div onClick={handleGridClick} className='Cell' key={i} id={i}></div>);
    }

    return (
        <div className='Gamepage'>


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