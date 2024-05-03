
// IMPORTS //
// React 
import { useState, useEffect } from "react"
// Styles 
import "./Gameoverpage.css"




// COMPONENT //

export const Gameoverpage = ({ setGameState }) => {

    // States 
    const [startTime, setStartTime] = useState('');
    const [finishTime, setFinishTime] = useState('');
    const [duration, setDuration] = useState(0);
    // Form States 
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // Function to format time
    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // UE to calculate duration when states updated
    useEffect(() => {
        if (startTime && finishTime) {
            const start = new Date(startTime);
            const finish = new Date(finishTime);
            const difference = finish.getTime() - start.getTime();
            setDuration(formatTime(difference));
            console.log(formatTime(difference));
        }
    }, [startTime, finishTime]);

    // UE to load players start and finish time on mount 
    useEffect(() => {
        getAccInfo();
    }, [])

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
            setStartTime(jsonData.userAccount[0].START_TIME);
            setFinishTime(jsonData.userAccount[0].FINISH_TIME);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

//Form functions 
    const handleUpdateFirstname = (e) => { 
        setFirstname(e.target.value)
    }
    const handleUpdateLastname = (e) => { 
        setLastname(e.target.value)
    }
    const hanldeSubmitForm = async(e) => { 
        e.preventDefault();
        console.log(firstname)
        console.log(lastname)
        // post fetch to 
        // add first name to user account
        // add last name to userAccount
        // add duration  (ms) to user account
        const JWT = localStorage.getItem('JWT')
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JWT
                }, 
                body: JSON.stringify({ 
                    firstname: firstname,
                    lastname: lastname
                })
            };
            const response = await fetch('https://photo-tagging-app.adaptable.app/submitscore', requestOptions);
            if (!response.ok) {
                setGameState('Homepage')
                throw new Error('Failed to fetch data');
            }
            setGameState('Homepage')
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }



    return (
        <div className="Gameoverpage">
            <img className='Homepage-Wallpaper' src='/Wallpaper.jpg'></img>
            <div className="Gameoverpage-header">
                Well Done!
                <br />
                You found all the characters in:
                <br />
                {duration}
            </div>
            <form onSubmit={hanldeSubmitForm}>
                Get on the leaderboard
                <input
                value={firstname}
                onChange={handleUpdateFirstname}
                placeholder="First Name"
                maxLength={15}></input>
                <input
                value={lastname}
                onChange={handleUpdateLastname}
                placeholder="Last Name"
                maxLength={20}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}