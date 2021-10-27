import * as React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useData, useUserState } from '../utilities/firebase.js';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

const Calendar = () => {
    const [user] = useUserState();
    const [images, loading, error] = useData(user ? user.uid : "no_user");

    const formattedImages = () => Object.keys(images ?? {}).map(key =>
        // <div>
            // <p>{key}</p>
            <Image key={key} src={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} roundedCircle className='calendar-entry' style={{gridArea: 'a34'}} />
        // </div>
    );

    return (
            //         {/* <h1>Mood Log</h1> */}
            // {/* {loading ? <p>Images Loading</p> : formattedImages()} */}
        <div className='calendar-layout'>
            <div className='calendar-grid'>
                {/* <div style={{gridArea: 'a00' , background: '#FFFFFF', height: '100%', width: '100%'}}></div> */}
                {loading ? <p>Images Loading</p> : formattedImages()}
            </div>
        </div>
    )
}
export default Calendar;
