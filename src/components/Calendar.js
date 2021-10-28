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
        <div>
            <p>{key}</p>
            <Image key={key} src={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} roundedCircle style={{ background: 'black', height: 50 }} />
        </div>
    );

    return (
        <div data-testid='calendar' style={{ overflow: 'scroll' }}>
            <h1>Mood Log</h1>
            {loading ? <p>Images Loading</p> : formattedImages()}
        </div>
    )
}
export default Calendar;
