import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import { getButtonStyling, getClearButtonStyling, getSigninButtonStyling, getPromptStyling, getDateStyling, getPromptGreeting } from '../utilities/time.js';
import '../Canvas.svg';
import ColorTool from './ColorTool';

const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SignInButton = () => (
    <Button
        onClick={() => signInWithGoogle()} className='signin-button-styling' style={{ color: getSigninButtonStyling() }}>
        Sign In
    </Button>
);

const SignOutButton = () => (
    <Button
        onClick={() => signOut()} className='signin-button-styling' style={{ color: getSigninButtonStyling() }}>
        Sign Out
    </Button>
);


const ClearButton = React.forwardRef((props, ref) => (
    <Button
        data-testid='clear-button' onClick={() => ref.current.clearCanvas()} className='clear-button-styling' style={{ background: getClearButtonStyling() }}>
        Clear Canvas
    </Button>
));

const UnDo = React.forwardRef((props, ref) => (
    <div onClick={() => ref.current.undo()} className="tool-circle">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2292 11.6667C14.3646 11.6667 10.8646 13.1104 8.16666 15.4583L2.91666 10.2083V23.3333H16.0417L10.7625 18.0542C12.7896 16.3625 15.3708 15.3125 18.2292 15.3125C23.3917 15.3125 27.7812 18.6812 29.3125 23.3333L32.7687 22.1958C30.7417 16.0854 25.0104 11.6667 18.2292 11.6667Z" fill="white" />
        </svg>
    </div>
));

const Canvas = React.forwardRef((props, ref) => {
    const canvas = ref ?? React.createRef();
    const [user] = useUserState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [canvasColor, setCanvasColor] = useState('#FFFFFF');
    const [backgroundImage, setBackgroundImage] = useState('https://cs397-drawly.firebaseapp.com/Canvas_background.png');

    const getDate = () => {
        const today = new Date();
        const month = MONTH_MAP[today.getMonth()];
        const day = DAY_MAP[today.getDay()];
        const date = today.getDate();
        return day + ', ' + month + ' ' + date;
    }

    const getDatePath = () => {
        return Date();
    }

    const saveImage = () => {
        canvas.current
            .exportSvg()
            .then(data => {
                writeData(data, `${user.uid}/${getDatePath()}`);
                canvas.current.clearCanvas();
                enqueueSnackbar('Image successfully saved.', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }, variant: 'success', autoHideDuration: 850,
                });
            })
            .catch(e => {
                console.log(e);
                enqueueSnackbar('Error saving image.', { variant: 'error' });
            });
    }
    return (
        <div data-cy='canvas-layout' className='canvas-layout'>
            <div className='date-wrapper'>
                <h1 className='date-styling' style={{ color: getDateStyling() }}>{getDate()}</h1>
                <h2 className={getPromptStyling()}>{getPromptGreeting()}</h2>
                <h2 className={getPromptStyling()}>How do you feel today?</h2>
            </div>
            <div data-testid='canvas-div'>
                <ReactSketchCanvas
                    ref={canvas}
                    strokeWidth={5}
                    strokeColor={strokeColor}
                    canvasColor={canvasColor}
                    height={300} // make dynamic
                    width={300} // make dynamic
                    backgroundImage={backgroundImage}
                    onUpdate={() => setBackgroundImage('')}
                />
            </div>
            <div className='tools-grid'>
                <ColorTool coloringType='stroke' color={strokeColor} setColor={setStrokeColor} setBackgroundImage={setBackgroundImage} />
                <ColorTool coloringType='canvas' color={canvasColor} setColor={setCanvasColor} setBackgroundImage={setBackgroundImage} />
                <div>
                    <UnDo ref={canvas} />
                </div>
            </div>

            <ClearButton ref={canvas} />

            {user ? <Button className='button-styling' style={{ backgroundColor: getButtonStyling() }} onClick={saveImage}>
                Check in
            </Button> : null}
            {user ? <SignOutButton /> : <SignInButton className='signin-button-styling' style={{ color: getSigninButtonStyling() }} />}
        </div>
    );
});

export default Canvas;