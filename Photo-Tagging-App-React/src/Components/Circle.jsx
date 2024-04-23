// IMPORTS
// Styles 
import { useEffect, useState } from "react"
import "./Circle.css"



// COMPONENT
export const Circle = ({ circlePageX, circlePageY, circleShowing }) => {



    return (
        <div className="Circle" style={{ display: `${circleShowing}`, top: `${circlePageY}px`, left: `${circlePageX}px` }}>
        </div>
    )
}