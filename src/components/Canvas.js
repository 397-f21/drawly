import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import ToggleButton from 'react-bootstrap/ToggleButton'
import { ref } from "@firebase/database";
import {isMorning, isAfternoon} from '../App.js';

const today = new Date();

const getButtonStyling = (today) => {
    return isMorning(today) ? 'morning-button-styling' : isAfternoon(today) ? 'afternoon-button-styling' : 'evening-button-styling';
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
    return(
    <ToggleButton
    className="mb-2"
    id="toggle-check"
    type="checkbox"
    variant="outline-primary"
    checked={checked}
    value="0"
    onChange={(e) => {setChecked(e.currentTarget.checked); ref.current.eraseMode(checked)}}
  >
    Eraser
  </ToggleButton>
    )

})

const ClearButton = React.forwardRef((props, ref) => (
    <Button
    data-testid='clear-button' onClick={() => ref.current.clearCanvas()} className={getButtonStyling(today)}>
        Clear Canvas
    </Button>
));

const UnDo = React.forwardRef((props, ref) => (
    <Button onClick={() => ref.current.undo()} className='undo-button-styling'>
        undo
    </Button>
));

const Canvas = React.forwardRef((props, ref) => {
    const canvas = ref ?? React.createRef();
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
        return Date();
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
                <h1 className={isMorning(today) ? 'morning-date-styling' : isAfternoon(today) ? 'afternoon-date-styling' : 'evening-date-styling'}>{getDate()}</h1>
                <h2 className={getPromptStyling(today)}>{isMorning(today)? 'Good morning!' : isAfternoon(today)? 'Good afternoon!' : 'Good evening!'}</h2>
                <h2 className={getPromptStyling(today)}>Draw how you feel today:</h2>
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
            {user ? <Button className={getButtonStyling(today)} onClick={saveImage}>
                Check in
            </Button> : null}
            <UnDo ref = {canvas}/>
            <EraseCheckedButton ref = {canvas}/>
            <ClearButton ref={canvas}/>
            {user ? <SignOutButton/> : <SignInButton className = {getSigninButtonStyling(today)}/>}
        </div>
    );
});

export default Canvas;