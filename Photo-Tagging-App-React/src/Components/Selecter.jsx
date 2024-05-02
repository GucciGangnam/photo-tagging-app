// IMPOPRTS 
// Styles 
import { useState } from 'react'
import './Selecter.css'


// Component





export const Selecter = ({ getAccInfo,
    selectedCell,
    setSelectedCell,
    selecterVisible,
    setSelecterVisible,
    setCircleShowing,
    setSelectedCharacter,
    tomFound,
    spidermanFound,
    kennyFound,
    rogerFound,
    brianFound,
}) => {

    // States 
    const [loading, setLoading] = useState(false)

    // Button handlers 
    // Handle Character select
    // NOTE - EACH ONE OF THESE SHOUDL MAKE A FETCH REQUEST WITH TEH ACCESS TOEKN TO TEH BACKEND

    // Check game over function
    const checkGameOver = async () => {
        const JWT = localStorage.getItem('JWT')
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
            };
            const response = await fetch('http://localhost:3000/checkgameover', requestOptions);
            console.log("game finish checking3")
            console.log(response)
            if (!response.ok) {
                console.log('front end - NOT WON')
                return;
            }
            console.log('front end - WON')
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    const handleSelectTom = async (e) => {
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        const JWT = localStorage.getItem('JWT')
        try {
            console.log("tom fetch started")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
                body: JSON.stringify({
                    selectedCell: selectedCell,
                })
            };
            const response = await fetch('http://localhost:3000/selecttom', requestOptions);
            if (!response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    console.log("Incorrect")
                    // handle incorrect guess on front end 
                }, 1000)
                return;
            }
            setTimeout(() => {
                setLoading(false)
                console.log("Correct")
                // handle incorrect guess on front end 
            }, 1000)
            checkGameOver();
            getAccInfo();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    const handleSelectSpiderman = async (e) => {
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        const JWT = localStorage.getItem('JWT')
        try {
            console.log("tom fetch started")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
                body: JSON.stringify({
                    selectedCell: selectedCell,
                })
            };
            const response = await fetch('http://localhost:3000/selectspiderman', requestOptions);
            if (!response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    console.log("Incorrect")
                    // handle incorrect guess on front end 
                }, 1000)
                return;
            }
            setTimeout(() => {
                setLoading(false)
                console.log("Correct")
                // handle incorrect guess on front end 
            }, 1000)
            checkGameOver();
            getAccInfo();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    const handleSelectKenny = async (e) => {
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        const JWT = localStorage.getItem('JWT')
        try {
            console.log("tom fetch started")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
                body: JSON.stringify({
                    selectedCell: selectedCell,
                })
            };
            const response = await fetch('http://localhost:3000/selectkenny', requestOptions);
            if (!response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    console.log("Incorrect")
                    // handle incorrect guess on front end 
                }, 1000)
                return;
            }
            setTimeout(() => {
                setLoading(false)
                console.log("Correct")
                // handle incorrect guess on front end 
            }, 1000)
            checkGameOver();
            getAccInfo();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    const handleSelectRoger = async (e) => {
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        const JWT = localStorage.getItem('JWT')
        try {
            console.log("tom fetch started")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
                body: JSON.stringify({
                    selectedCell: selectedCell,
                })
            };
            const response = await fetch('http://localhost:3000/selectroger', requestOptions);
            if (!response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    console.log("Incorrect")
                    // handle incorrect guess on front end 
                }, 1000)
                return;
            }
            setTimeout(() => {
                setLoading(false)
                console.log("Correct")
                // handle incorrect guess on front end 
            }, 1000)
            checkGameOver();
            getAccInfo();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    const handleSelectBrian = async (e) => {
        setSelectedCharacter(e.target.alt)
        setLoading(true)
        const JWT = localStorage.getItem('JWT')
        try {
            console.log("tom fetch started")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT,
                },
                body: JSON.stringify({
                    selectedCell: selectedCell,
                })
            };
            const response = await fetch('http://localhost:3000/selectbrian', requestOptions);
            if (!response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    console.log("Incorrect")
                    // handle incorrect guess on front end 
                }, 1000)
                return;
            }
            setTimeout(() => {
                setLoading(false)
                console.log("Correct")
                // handle incorrect guess on front end 
            }, 1000)
            checkGameOver();
            getAccInfo();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
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

