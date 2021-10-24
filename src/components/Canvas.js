import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'
import { ReactSVG } from 'react-svg'

const Canvas = class extends React.Component {
    constructor(props) {
        super(props);
        this.saveImage = this.saveImage.bind(this);
        this.canvas = React.createRef();
        this.state = {image: null};
    }

    saveImage = () => {
        this.canvas.current
            .exportSvg()
            .then(data => {
                // console.log(data);
                localStorage.setItem('image', data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    loadImage = () => {
        const image = localStorage.getItem('image');
        // var parser = new DOMParser();
        // var parsedImage = parser.parseFromString(image, "image/svg+xml");
        console.log(image);
        this.setState({image: image});
    }

    render() {
        return (
            <div>
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(this.state.image)}`} />
                <h2>{this.props.title}</h2>
                <ReactSketchCanvas
                    ref={this.canvas}
                    strokeWidth={5}
                    strokeColor="black"
                />
                <Button onClick={this.saveImage}>
                    Save Image
                </Button>
                <Button onClick={this.loadImage}>
                    Load Image
                </Button>
            </div>
        );
    }
};

export default Canvas;