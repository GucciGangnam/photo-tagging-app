// IMPORTS 
// Styles 
import './Homepage.css'
// React 
import { useEffect, useState } from 'react';
// RRD 
// Components
import { Howtoplay } from '../Components/Howtoplay';
// COMPONENT 
export const Homepage = ({ setGameState }) => {

    // STATES 
    const [howToPlayIsOpen, SetHowToPlayIsOpen] = useState(false);
    const [blur, setBlur] = useState('0px')

    // Button handlers 
    const HowtoplayBTN = () => {
        setBlur('10px')
        SetHowToPlayIsOpen(true)
    }

    const StartGame = async () => {
        const JWT = localStorage.getItem('JWT')
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            // If JWT exists, add it to the headers
            if (JWT) {
                requestOptions.headers['Authorization'] = JWT;
            }
            setGameState('Loading')
            const response = await fetch('http://localhost:3000/startgame', requestOptions);
            if (!response.ok) {
                setGameState('Homepage')
                throw new Error('Failed to fetch data');
                
            }
            const jsonData = await response.json();
            localStorage.setItem('JWT', 'Bearer ' + jsonData.jwt);
            setTimeout(() => {
                setGameState('Gamepage')
            }, 2000);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }

    }
    return (
        <div className="Homepage">

            {howToPlayIsOpen && <Howtoplay SetHowToPlayIsOpen={SetHowToPlayIsOpen} setBlur={setBlur} />}

            <img className='Homepage-Wallpaper' src='/Wallpaper.jpg'></img>

            {/* Game title */}
            <div className='Homepage-Gametitle' style={{ filter: `blur(${blur})` }}>
                <img className='Gametitle-Logo' src='/Picture 1.png' alt='Logo'></img>
            </div>


            {/* Center */}
            <div className='Homepage-Controlls' style={{ filter: `blur(${blur})` }}>
                <div className='Homepage-Controlls-island'>
                    <div className='Homepage-Character-Bubble'>
                        <img src='/PngItem_26692.png' alt='Tom'></img>
                    </div>
                    <div className='Homepage-Character-Bubble'>
                        <img src='/pngwing.com-2.png' alt='Spiderman'></img>
                    </div>
                    <div className='Homepage-Character-Bubble'>
                        <img src='/pngwing.com.png' alt='Kenny'></img>
                    </div>
                    <div className='Homepage-Character-Bubble'>
                        <img src='/Roger-American-Dad-PNG-Photos.png' alt='Roger'></img>
                    </div>
                    <div className='Homepage-Character-Bubble'>
                        <img src='/pngwing.com-3.png' alt=''></img>
                    </div>
                </div>
                <span className='Hompage-Controlls-BTN-Container'>
                    <button onClick={HowtoplayBTN}>How to play</button>
                    <button onClick={StartGame}>Play</button>
                </span>
            </div>

            {/* Leaderboard */}
            <div className='Homepage-Leaderboard' style={{ filter: `blur(${blur})` }}>
                <table>
                    <caption>Leaderboard</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}