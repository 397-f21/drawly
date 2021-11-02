import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import ToggleButton from 'react-bootstrap/ToggleButton'
import {isMorning, isAfternoon} from '../App.js';
import '../Canvas.svg';

const today = new Date();

const getButtonStyling = (today) => {
    return isMorning(today) ? 'morning-button-styling' : isAfternoon(today) ? 'afternoon-button-styling' : 'evening-button-styling';
}

const getClearButtonStyling = (today) => {
    return isMorning(today) ? 'morning-clear-button-styling' : isAfternoon(today) ? 'afternoon-clear-button-styling' : 'evening-clear-button-styling';
}

const getSigninButtonStyling = (today) => {
    return isMorning(today) ? 'morning-signin-button-styling' : isAfternoon(today) ? 'afternoon-signin-button-styling' : 'evening-signin-button-styling';
}

const getPromptStyling = (today) => {
    return isMorning(today) ? 'prompt-styling' : isAfternoon(today) ? 'prompt-styling' : 'evening-prompt-styling'; 
}

const SignInButton = () => (
    <Button
        onClick={() => signInWithGoogle()} className={getSigninButtonStyling(today)}>
        Sign In
    </Button>
);
const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SignOutButton = () => (
    <Button
        onClick={() => signOut()} className={getSigninButtonStyling(today)}>
        Sign Out
    </Button>
);

const EraseCheckedButton = React.forwardRef((props, ref) => {

    const [checked, setChecked] = useState(true);
    return (
        <ToggleButton
            className="tool-circle"
            id="toggle-check"
            type="checkbox"
            variant="tool-circle"
            checked={checked}
            value="0"
            onChange={(e) => { setChecked(e.currentTarget.checked); ref.current.eraseMode(checked) }}
        >
            <svg width="30" height="30" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.9221 25.0519H16.5779L27.8864 13.7434C28.4189 13.2109 28.4189 12.3475 27.8864 11.8149L16.9773 0.905848C16.4448 0.373303 15.5814 0.373303 15.0488 0.905848L-1.31484 17.2694C-1.57066 17.5251 -1.71429 17.8719 -1.71429 18.2337C-1.71429 18.5954 -1.57066 18.9422 -1.31484 19.1979L6.86699 27.3797C7.12271 27.6355 7.46953 27.7791 7.83117 27.7791L13.2857 27.7792C13.2863 27.7792 13.2867 27.7791 13.2873 27.7791L26.9221 27.7792C27.6751 27.7792 28.2857 27.1687 28.2857 26.4156C28.2857 25.6625 27.6752 25.0519 26.9221 25.0519ZM16.013 3.79857L24.9936 12.7792L17.1039 20.6689L8.12326 11.6883L16.013 3.79857Z" fill="white"/>
            </svg>
        </ToggleButton>
    )

})

const ClearButton = React.forwardRef((props, ref) => (
    <Button
    data-testid='clear-button' onClick={() => ref.current.clearCanvas()} className={getClearButtonStyling(today)}>
        Clear Canvas
    </Button>
));

const UnDo = React.forwardRef((props, ref) => (
    <div onClick={() => ref.current.undo()} className="tool-circle">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2292 11.6667C14.3646 11.6667 10.8646 13.1104 8.16666 15.4583L2.91666 10.2083V23.3333H16.0417L10.7625 18.0542C12.7896 16.3625 15.3708 15.3125 18.2292 15.3125C23.3917 15.3125 27.7812 18.6812 29.3125 23.3333L32.7687 22.1958C30.7417 16.0854 25.0104 11.6667 18.2292 11.6667Z" fill="white"/>
        </svg>
    </div>
));

const Canvas = React.forwardRef((props, ref) => {
    const canvas = ref ?? React.createRef();
    const [user] = useUserState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [canvasColor, setCanvasColor] = useState('#FFFFFF');

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
                <h1 className={isMorning(today) ? 'morning-date-styling' : isAfternoon(today) ? 'afternoon-date-styling' : 'evening-date-styling'}>{getDate()}</h1>
                <h2 className={getPromptStyling(today)}>{isMorning(today)? 'Good morning!' : isAfternoon(today)? 'Good afternoon!' : 'Good evening!'}</h2>
                <h2 className={getPromptStyling(today)}>Draw how you feel today:</h2>
            </div>
            <div data-testid='canvas-div'>
                <ReactSketchCanvas
                    ref={canvas}
                    strokeWidth={5}
                    strokeColor={strokeColor}
                    canvasColor={canvasColor}
                    height={300} // make dynamic
                    width={300} // make dynamic
                />
            </div>
            <div className='tools-grid'>
                <div style={{ gridArea: 'brush'}}>
                    <div className='tool-circle'
                    style={{backgroundColor: strokeColor}}>
                        <input
                        type="color"
                        className='tool-circle'
                        style={{opacity: 0}}
                        data-testid='stroke-color-input'
                        value={strokeColor}
                        onChange={(e) => {
                            setStrokeColor(e.target.value);
                        }}></input>
                    </div>
                </div>
                <div style={{ gridArea: 'background'}}>
                    <div className='tool-circle'
                    style={{backgroundColor: canvasColor}}>
                        <input
                        type="color"
                        className="tool-circle"
                        style={{opacity: 0}}
                        data-testid='canvas-color-input'
                        value={canvasColor}
                        onChange={(e) => {
                            setCanvasColor(e.target.value);
                        }}>
                        </input>
                    </div>
                </div>
                <div style={{ gridArea: 'eraser'}}>
                    <EraseCheckedButton ref={canvas} />
                </div>
                <div style={{ gridArea: 'undo'}}>
                    <UnDo ref={canvas} />
                </div>
            </div>
        
            <ClearButton ref={canvas} />
            
            {user ? <Button className={getButtonStyling(today)} onClick={saveImage}>
                Check in
            </Button> : null}
            {user ? <SignOutButton/> : <SignInButton className = {getSigninButtonStyling(today)}/>}
        </div>
    );
});

export default Canvas;