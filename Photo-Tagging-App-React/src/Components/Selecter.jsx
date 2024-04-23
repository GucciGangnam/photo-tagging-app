// IMPOPRTS 
// Styles 
import { useState } from 'react'
import './Selecter.css'


// Component





export const Selecter = ({selecterVisible, setSelecterVisible, setCircleShowing}) => {

// States 


    // Button handlers 
    const handleCloseSeleter = () => {
        setSelecterVisible(false)
        setCircleShowing('none')
    }

    return (
        <div className={selecterVisible ? 'SelecterVisible' : 'Selecter'}>

            <div className='Selecter-Controlls-island'>
                <div className='Selecter-Character-Bubble'>
                    <img src='/PngItem_26692.png' alt='Tom'></img>
                </div>
                <div className='Selecter-Character-Bubble'>
                    <img src='/pngwing.com-2.png' alt='Spiderman'></img>
                </div>
                <div className='Selecter-Character-Bubble'>
                    <img src='/pngwing.com.png' alt='Kenny'></img>
                </div>
                <div className='Selecter-Character-Bubble'>
                    <img src='/Roger-American-Dad-PNG-Photos.png' alt='Roger'></img>
                </div>
                <div className='Selecter-Character-Bubble'>
                    <img src='/pngwing.com-3.png' alt=''></img>
                </div>
                <button onClick={handleCloseSeleter} className='Selecter-Close-BTN' style={{ display: selecterVisible ? 'block' : 'none' }}>Close</button>
            </div>
            Response from server - Right or wrong
        </div>
    )
}