import {ReactSketchCanvas} from 'react-sketch-canvas';
import './App.css';

function App() {
  return (
    <div className='layout'>
        <h1>How are you feeling today?</h1>
        <div>
            <ReactSketchCanvas></ReactSketchCanvas>
        </div>
    </div>
  );
}

export default App;
