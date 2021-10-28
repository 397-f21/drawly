import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { useData, signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { ref } from "@firebase/database";

const state = [true, false];
const SignInButton = () => (
    <Button
        onClick={() => signInWithGoogle()} className='signin-button-styling'>
        Sign In
    </Button>
);
const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SignOutButton = () => (
    <Button
        onClick={() => signOut()} className='signin-button-styling'>
        Sign Out
    </Button>
);

const EraseToggle = React.forwardRef((props, ref) => (
    <BootstrapSwitchButton
    width={100}
    onstyle="light" 
    offstyle="warning"
    checked={false}
    onlabel='Erase'
    offlabel='Draw'
    onChange={(checked) => {
        ref.current.eraseMode(checked)
    }} className='button-styling'/>
));

const ClearButton = React.forwardRef((props, ref) => (
    <Button onClick={() => ref.current.clearCanvas()} className='button-styling'>
        Clear Canvas
    </Button>
));


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
                enqueueSnackbar('Image successfully saved.', {anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },variant: 'success', autoHideDuration: 850,});
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
            <EraseToggle ref = {canvas}/>
            <ClearButton ref={canvas}/>
            {user ? <SignOutButton/> : <SignInButton className = 'signin-button-styling'/>}
        </div>
    );
};

export default Canvas;