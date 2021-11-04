import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData, useUserState } from '../utilities/firebase';
import { useSnackbar } from 'notistack';
import { getButtonStyling, getSigninButtonStyling, getPromptStyling, getDateStyling, getPromptGreeting } from '../utilities/time.js';
import '../Canvas.svg';
import { Undo, ClearButton, ColorTool } from './CanvasTools';
import { SignInButton, SignOutButton } from '../utilities/auth';

const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
                    <Undo ref={canvas} />
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