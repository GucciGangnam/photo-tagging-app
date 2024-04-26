// IMPOPRTS 
// Styles 
import { useState } from 'react'
import './Selecter.css'


// Component





export const Selecter = ({ selectedCell,
    setSelectedCell,
    selecterVisible,
    setSelecterVisible,
    setCircleShowing,
    selectedCharacter,
    setSelectedCharacter,
    tomFound,
    setTomFound,
    spidermanFound,
    setSpidermanFound,
    kennyFound,
    setKennyFound,
    rogerFound,
    setRogerFound,
    brianFound,
    setBrianFound
}) => {

    // States 
    const [loading, setLoading] = useState(false)

    // Button handlers 
    // Handle Character select
    // NOTE - EACH ONE OF THESE SHOUDL MAKE A FETCH REQUEST WITH TEH ACCESS TOEKN TO TEH BACKEND 

    const handleSelectTom = (e) => { 
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setTomFound(true);
        }, 2000)
    }
    const handleSelectSpiderman = (e) => { 
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setSpidermanFound(true);
        }, 2000)
    }
    const handleSelectKenny = (e) => { 
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setKennyFound(true);
        }, 2000)
    }
    const handleSelectRoger = (e) => { 
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setRogerFound(true);
        }, 2000)
    }
    const handleSelectBrian = (e) => { 
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setBrianFound(true);
        }, 2000)
    }

    // Close selecter
    const handleCloseSeleter = () => {
        setSelecterVisible(false)
        setLoading(false)
        setCircleShowing('none')
        setSelectedCell('')
        setSelectedCharacter('')
    }

    return (
        <div className={selecterVisible ? 'SelecterVisible' : 'Selecter'} >
            <div className='Selecter-Controlls-island'>
                {loading ? <img src='/Loading.gif' alt='Loadig'></img> : (
                    <>
                        <div className='Selecter-Character-Bubble'>
                            <img style={tomFound ? { filter: 'grayscale(100%)' } : null} src='/PngItem_26692.png' alt='Tom' onClick={selecterVisible ? handleSelectTom : null} />
                            {tomFound && <img style={{ position: "absolute" }} src='/Check Mark.png' alt='Check Mark'></img>}
                        </div>
                        <div className='Selecter-Character-Bubble'>
                            <img style={spidermanFound ? { filter: 'grayscale(100%)' } : null} src='/pngwing.com-2.png' alt='Spiderman' onClick={selecterVisible ? handleSelectSpiderman : null} />
                            {spidermanFound && <img style={{ position: "absolute" }} src='/Check Mark.png' alt='Check Mark'></img>}
                        </div>
                        <div className='Selecter-Character-Bubble'>
                            <img style={kennyFound ? { filter: 'grayscale(100%)' } : null} src='/pngwing.com.png' alt='Kenny' onClick={selecterVisible ? handleSelectKenny : null} />
                            {kennyFound && <img style={{ position: "absolute" }} src='/Check Mark.png' alt='Check Mark'></img>}
                        </div>
                        <div className='Selecter-Character-Bubble'>
                            <img style={rogerFound ? { filter: 'grayscale(100%)' } : null} src='/Roger-American-Dad-PNG-Photos.png' alt='Roger' onClick={selecterVisible ? handleSelectRoger : null} />
                            {rogerFound && <img style={{ position: "absolute" }} src='/Check Mark.png' alt='Check Mark'></img>}
                        </div>
                        <div className='Selecter-Character-Bubble'>
                            <img style={brianFound ? { filter: 'grayscale(100%)' } : null} src='/pngwing.com-3.png' alt='Brian' onClick={selecterVisible ? handleSelectBrian : null} />
                            {brianFound && <img style={{ position: "absolute" }} src='/Check Mark.png' alt='Check Mark'></img>}
                        </div>
                        <button onClick={handleCloseSeleter} className='Selecter-Close-BTN' style={{ display: selecterVisible ? 'block' : 'none' }}>Hide</button>
                    </>
                )}
            </div>
        </div>
    )
}

