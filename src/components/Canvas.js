import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import { getButtonStyling, getClearButtonStyling, getSigninButtonStyling, getPromptStyling, getDateStyling, getPromptGreeting } from '../utilities/time.js';
import '../Canvas.svg';

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
        <div className='canvas-layout'>
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
                <div className='tool-circle-wrap'>
                    <div className='tool-circle'
                        style={{ backgroundColor: strokeColor }}>
                        <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.0125 9.17505L14.325 4.48755L3 15.8125V20.5H7.6875L19.0125 9.17505ZM5.5 18V16.85L14.325 8.02505L15.475 9.17505L6.65 18H5.5Z" fill="white" />
                            <path d="M22.6375 5.55C23.125 5.0625 23.125 4.275 22.6375 3.7875L19.7125 0.8625C19.4625 0.6125 19.15 0.5 18.825 0.5C18.5125 0.5 18.1875 0.625 17.95 0.8625L15.6625 3.15L20.35 7.8375L22.6375 5.55Z" fill="white" />
                            <path d="M25.5 23H0.5V28H25.5V23Z" fill="white" />
                        </svg>
                        <input
                            type="color"
                            className='tool-circle'
                            style={{ opacity: 0 }}
                            data-testid='stroke-color-input'
                            value={strokeColor}
                            onChange={(e) => {
                                setStrokeColor(e.target.value);
                            }}></input>
                    </div>
                </div>
                <div className='tool-circle-wrap'>
                    <div className='tool-circle'
                        style={{ backgroundColor: canvasColor }}>
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7 11.175L7.525 0L5.7625 1.7625L8.7375 4.7375L2.3 11.175C1.5625 11.9125 1.5625 13.1 2.3 13.825L9.175 20.7C9.5375 21.0625 10.025 21.25 10.5 21.25C10.975 21.25 11.4625 21.0625 11.825 20.7L18.7 13.825C19.4375 13.1 19.4375 11.9125 18.7 11.175ZM4.5125 12.5L10.5 6.5125L16.4875 12.5H4.5125ZM21.75 14.375C21.75 14.375 19.25 17.0875 19.25 18.75C19.25 20.125 20.375 21.25 21.75 21.25C23.125 21.25 24.25 20.125 24.25 18.75C24.25 17.0875 21.75 14.375 21.75 14.375ZM0.5 25H25.5V30H0.5V25Z" fill="white" />
                        </svg>
                        <input
                            type="color"
                            className="tool-circle"
                            style={{ opacity: 0 }}
                            data-testid='canvas-color-input'
                            value={canvasColor}
                            onChange={(e) => {
                                setCanvasColor(e.target.value);
                                setBackgroundImage('');
                            }}>
                        </input>
                    </div>
                </div>
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