import * as React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useData } from '../utilities/firebase.js';

const Calendar = ({user}) => {
    const [images, loading, error] = useData(user);
    console.log(images);

    const formattedImages = () => Object.keys(images).map(key => 
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} />
    );

return (
    <div>
        <h1>Mood Log</h1>
        {loading? <p>Images Loading</p>:formattedImages()}
    </div>
)
}
export default Calendar;
