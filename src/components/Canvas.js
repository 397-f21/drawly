import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { useData, signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const getDate = () => {
        const today = new Date();
        const month = MONTH_MAP[today.getMonth()];
        const day = DAY_MAP[today.getDay()];
        const date = today.getDate();
        return day + ', ' + month + ' ' + date;
    }

    const getDatePath = () => {
        const today = new Date();
        const month = MONTH_MAP[today.getMonth()];
        const day = DAY_MAP[today.getDay()];
        const date = today.getDate();
        const year = today.getFullYear();
        return [day, month, date, year].join('_')
    }

    const saveImage = () => {
        canvas.current
            .exportSvg()
            .then(data => {
                writeData(data, `${user.uid}/${getDatePath()}`);
                canvas.current.clearCanvas();
                enqueueSnackbar('Image successfully saved.', {variant: 'success', autoHideDuration: 1500,});
            })
            .catch(e => {
                console.log(e);
                enqueueSnackbar('Error saving image.', {variant: 'error'});
            });
    }

    return (
        <div className='canvas-layout'>
            <div className='date-wrapper'>
                <h1 className='date-styling'>{getDate()}</h1>
                <h2 className='prompt-styling'>How are you feeling today?</h2>
            </div>
            <div>
                <ReactSketchCanvas
                    ref={canvas}
                    strokeWidth={5}
                    strokeColor="black"
                    height={300} // make dynamic
                    width={300} // make dynamic
                />
            </div>
            {user ? <Button className='button-styling' onClick={saveImage}>
                Check in
            </Button> : null}
            {user ? <SignOutButton /> : <SignInButton />}
        </div>
    );
};

export default Canvas;