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

const SignOutButton = () => (
    <Button
        onClick={() => signOut()}>
        Sign Out
    </Button>
);

const Canvas = ({ title }) => {
    const canvas = React.createRef();
    const [user] = useUserState();

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
        <div>
            <div>
                <ReactSketchCanvas
                    ref={canvas}
                    strokeWidth={5}
                    strokeColor="black"
                    height={300} // make dynamic
                    width={300} // make dynamic
                />
                {user ?
                    <Button onClick={saveImage}>
                        Save Image
                    </Button> :
                    null}
                {user ? <SignOutButton /> : <SignInButton />}
            </div>
        </div>
    );
};

export default Canvas;