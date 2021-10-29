import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import { useSnackbar } from 'notistack';
import ToggleButton from 'react-bootstrap/ToggleButton'
import { ref } from "@firebase/database";

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


// const EraseButton = forwardRef((props, ref) => (
//     <ToggleButton
//     className="mb-2"
//     id="toggle-check"
//     type="checkbox"
//     variant="outline-primary"
//     checked={false}
//     value="1"
//     onChange={(checked) => ref.current.eraseMode(checked)}
//   >
//     Erase Mode
//   </ToggleButton>

// ));


const ClearButton = React.forwardRef((props, ref) => (
    <Button
    data-testid='clear-button' onClick={() => ref.current.clearCanvas()} className='button-styling'>
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
            <UnDo ref = {canvas}/>
            <EraseCheckedButton ref = {canvas}/>
            <ClearButton ref={canvas}/>
            {user ? <SignOutButton/> : <SignInButton className = 'signin-button-styling'/>}
        </div>
    );
});

export default Canvas;