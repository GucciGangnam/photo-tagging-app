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
    const [blur, setBlur] = useState('0px');
    const [top5, setTop5] = useState([]);

    // LEADER BOARD FETCH //
    // UE to fetch highscorews on mount 
    useEffect(() => {
        fetchHighscores();
    }, [])
    // Fetch top 5 fastest players
    const fetchHighscores = async () => {
        try {
            const response = await fetch('https://photo-tagging-app.adaptable.app/gethighscores');
            const data = await response.json();
            console.log(data); // or do something else with the data
            setTop5(data)
        } catch (error) {
            console.error('Error fetching highscores:', error);
        }
    }
    // Helper function to format duration in HH:MM:SS format
    const formatDuration = (duration) => {
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

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
            const response = await fetch('https://photo-tagging-app.adaptable.app/startgame', requestOptions);
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
                    <caption>Top 5 Leaderboard</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top5.map((player, index) => (
                            <tr key={index}>
                                <td>{`${player.firstName} ${player.lastName}`}</td>
                                <td>{formatDuration(player.duration)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

