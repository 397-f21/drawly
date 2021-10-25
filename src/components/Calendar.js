import * as React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useData } from '../utilities/firebase.js';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

const Calendar = ({user}) => {
    const [images, loading, error] = useData(user);
    console.log(images);

    const formattedImages = () => Object.keys(images).map(key => 
        <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} roundedCircle style={{background: 'black', height: 50}}/>
    );

return (
    <div style = {{overflow: 'scroll'}}>
        <h1>Mood Log</h1>
        {loading? <p>Images Loading</p>:formattedImages()}
    </div>
)
}
export default Calendar;
