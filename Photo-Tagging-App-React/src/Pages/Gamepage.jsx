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

    // Get user Accoutn info on mount
    useEffect(() => {
        console.log("gamepage mounted")
        getAccInfo();
    }, [])

    // STATES
    const [userAccount, setUserAccount] = useState({})
    const [elapsedTime, setElapsedTime] = useState(0);

    // UE to update front with back end saved data
    useEffect(() => {
        console.log(userAccount)
        if (userAccount.FOUND_BRIAN) {
            setBrianFound(true)
        }
        if (userAccount.FOUND_KENNY) {
            setKennyFound(true)
        }
        if (userAccount.FOUND_ROGER) {
            setRogerFound(true)
        }
        if (userAccount.FOUND_SPIDERMAN) {
            setSpidermanFound(true)
        }
        if (userAccount.FOUND_TOM) {
            setTomFound(true)
        }
        // Calculate elapsed time
        calculateElapsedTime();
    }, [userAccount])

    // Function to fetch acc info 
    const getAccInfo = async () => {
        const JWT = localStorage.getItem('JWT')
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT
                }
            };
            const response = await fetch('http://localhost:3000/userAccount', requestOptions);
            if (!response.ok) {
                setGameState('Homepage')
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setUserAccount(jsonData.userAccount[0]);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    // TIMER //
    // Calculate elapsed time
    const calculateElapsedTime = () => {
        if (userAccount.START_TIME) {
            const startTime = new Date(userAccount.START_TIME);
            const currentTime = new Date();
            const difference = currentTime - startTime;
            setElapsedTime(difference);
        }
    };

    // Timer format function
    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${minutes % 60}:${seconds % 60}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            calculateElapsedTime();
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    // Game function States 
    const [selectedCell, setSelectedCell] = useState('')
    const [selectedCharacter, setSelectedCharacter] = useState('')

    const [tomFound, setTomFound] = useState(false);
    const [spidermanFound, setSpidermanFound] = useState(false);
    const [kennyFound, setKennyFound] = useState(false);
    const [rogerFound, setRogerFound] = useState(false);
    const [brianFound, setBrianFound] = useState(false);

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
            {/* Timer */}
            <div className='Timer'>
                <p>{formatTime(elapsedTime)}</p>
            </div>
            {/* Hightlight circle */}
            <Circle circlePageX={circlePageX} circlePageY={circlePageY} circleShowing={circleShowing} />
            {/* drop down selecter */}
            <Selecter
                getAccInfo={getAccInfo}
                setUserAccount={setUserAccount}
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
        </div>
    )
}