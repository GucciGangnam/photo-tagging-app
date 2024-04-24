// IMPORTS 
// Styles 
import './LoadingGamepage.css'
// RRD 
// React 
// Compoennst 
import { LoadingComp } from '../Components/LoadingComp'



// COMPONENT
export const LoadingGamepage = () => {
    return (
        <div className='LoadingGamepage'>
            <img className='Homepage-Wallpaper' src='/Wallpaper.jpg'></img>
            <LoadingComp />
        </div>
    )
}