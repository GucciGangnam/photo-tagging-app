// IMPORTS
// Styles 
import './LoadingComp.css'
// React 
import { useState } from 'react'



// COMPONENT




export const LoadingComp = () => {
    // State
    const [timeoutMSG, setTimeoutMSG] = useState('This may take a while because im not paying for hosting.');
    setTimeout(() => { 
        setTimeoutMSG('Ok, looks like theres a problem')
    },10000)
    
    return (
        <div className='LoadingComp'>
            <div className='Loadingcomp-Island'>
                <div className='Loadingcomp-Bubble1'></div>
                <div className='Loadingcomp-Bubble2'></div>
                <div className='Loadingcomp-Bubble3'></div>
                <div className='Loadingcomp-Bubble4'></div>
                <div className='Loadingcomp-Bubble5'></div>
            </div>
            Loading...
            <p>{timeoutMSG}</p>
        </div>
    )
}