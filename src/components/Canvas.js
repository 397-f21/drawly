import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { useData, signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';

const SignInButton = () => (
    <Button
        onClick={() => signInWithGoogle()}>
        Sign In
    </Button>
);
const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SignOutButton = () => (
    <Button
        onClick={() => signOut()}>
        Sign Out
    </Button>
);

const Canvas = ({ title }) => {
    const canvas = React.createRef();
    const [user] = useUserState();

    const getDate = () => {
        let today = new Date();
        let month = MONTH_MAP[today.getMonth()];
        let day = DAY_MAP[today.getDay()];
        let date = today.getDate()
        return day + ', ' + month + ' ' + date;
    }

    const saveImage = () => {
        canvas.current
            .exportSvg()
            .then(data => {
                writeData(data, `${user.uid}/dummy_date7`);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className='canvas-layout'>
            <div className='date-wrapper'>
                <h1 className='date-styling'>{getDate()}</h1>
                <h2 className='prompt-styling'>How are you feeling today?</h2>
            </div>
            {/* <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} /> */}
            <ReactSketchCanvas
                ref={canvas}
                strokeWidth={5}
                strokeColor="black"
                height={300} // make dynamic
                width={300} // make dynamic
            />
            <Button className='button-styling' onClick={saveImage}>
                Check in
            </Button>
            {user ? <SignOutButton /> : <SignInButton />}
        </div>
    );
};

export default Canvas;