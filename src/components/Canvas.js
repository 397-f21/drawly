import * as React from "react";
import { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { writeData } from '../utilities/firebase';
import { useData } from '../utilities/firebase.js';


const Canvas = () => {
    const canvas = React.createRef();
    const [image, setImage] = useState(null);
    const [dbImage, loading, error] = useData('dummy_user');

    const saveImage = () => {
        canvas.current
            .exportSvg()
            .then(data => {
                // console.log(data);
                // localStorage.setItem('image', data);
                writeData(data, 'dummy_user/dummy_date4');
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
            <div>
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />
                <ReactSketchCanvas
                    ref={canvas}
                    strokeWidth={5}
                    strokeColor="black"
                />
                <Button onClick={saveImage}>
                    Save Image
                </Button>
                <Button onClick={loadImage}>
                    Load Image
                </Button>
            </div>
    );
};

export default Canvas;