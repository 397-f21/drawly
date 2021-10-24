import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Button from 'react-bootstrap/Button'

const Canvas = class extends React.Component {
    constructor(props) {
        super(props);
        this.saveImage = this.saveImage.bind(this);

        this.canvas = React.createRef();
    }

    saveImage = () => {
        this.canvas.current
            .exportSvg()
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <ReactSketchCanvas
                    ref={this.canvas}
                    strokeWidth={5}
                    strokeColor="black"
                />
                <Button onClick={this.saveImage}>
                    Get Image
                </Button>
            </div>
        );
    }
};

export default Canvas;