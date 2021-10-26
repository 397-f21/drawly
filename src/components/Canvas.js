import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { useData } from '../utilities/firebase.js';

const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Canvas = () => {
    const canvas = React.createRef();
    const [image, setImage] = useState(null);
    const [dbImage, loading, error] = useData('dummy_user');

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
                // console.log(data);
                // localStorage.setItem('image', data);
                writeData(data, 'dummy_user/dummy_date7');
            })
            .catch(e => {
                console.log(e);
            });
    }

    const loadImage = () => {
        // const image = localStorage.getItem('image');
        // var parser = new DOMParser();
        // var parsedImage = parser.parseFromString(image, "image/svg+xml");
        
        // console.log(image);
        setImage(dbImage.dummy_date2);
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
                    height = {300} // make dynamic
                    width = {300} // make dynamic
                />
                <Button className='button-styling' onClick={saveImage}>
                    Check in
                </Button>
                {/* <Button onClick={loadImage}>
                    Load Image
                </Button> */}
            </div>
    );
};

export default Canvas;