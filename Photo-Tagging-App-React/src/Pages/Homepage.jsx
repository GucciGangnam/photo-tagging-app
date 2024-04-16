// IMPORTS 
// Styles 
import './Homepage.css'
// React 
import { useState } from 'react';
// RRD 

// COMPONENT 
export const Homepage = () => {

    // STATES 
    const [howToPlayIsOpen, SetHowToPlayIsOpen] = useState(false);
    return (
        <div className="Homepage">
            <img className='Homepage-Wallpaper' src='/Wallpaper.jpg'></img>

            {/* Game title */}
            <div className='Homepage-Gametitle'>
                Toon Finder
            </div>

            {/* Center */}
            <div className='Homepage-Controlls'>
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
                        <img src='' alt=''></img>
                    </div>
                </div>
                <span className='Hompage-Controlls-BTN-Container'>
                    <button>How to play</button>
                    <button>Play</button>
                </span>
            </div>

            {/* Leaderboard */}
            <div className='Homepage-Leaderboard'>
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