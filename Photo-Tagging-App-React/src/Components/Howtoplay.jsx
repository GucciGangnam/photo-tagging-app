// IMPORTS
// React
import { useState } from "react"
// RRD

// styles
import "./Howtoplay.css"

// COMPONENTS 

export const Howtoplay = ({ SetHowToPlayIsOpen, setBlur }) => {
    // States 

    // Button handlers 
    const handleCloseBTN = () => {
        SetHowToPlayIsOpen(false)
        setBlur('0px')
    }

    return (

        <div className='Howtoplay'>

            <div className="Rule">
                <div className="Rule-Text">
                    Search the image for each character.
                </div>
                <div className="Rule-Icon">
                    <img src="/Search.png" alt="SearchGlass"></img>
                </div>
            </div>


            <div className="Rule">
                <div className="Rule-Text">
                    Once you find a character, click and then select them from the dropdown menu.
                </div>
                <div className="Rule-Icon">
                    <img src="/Price Tag.png" alt="Tag"></img>
                </div>
            </div>


            <div className="Rule">
                <div className="Rule-Text">
                    A timer will start when the game begins and will stop when you find them all!
                </div>
                <div className="Rule-Icon">
                    <img src="/Timer.png" alt="Timer"></img>
                </div>
            </div>

            <button onClick={handleCloseBTN}>Close</button>

        </div>

    )
}