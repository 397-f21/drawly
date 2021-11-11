import {useState} from 'react'
import './App.css';
import Canvas from './components/Canvas.js'
import Calendar from './components/Calendar.js'
import Tab from './components/Tab.js'
import {getLayoutStyling} from './utilities/time.js';

function App() {

    const [mode, setMode] = useState('draw');

    const swapMode = () => {
        mode === 'draw' ? setMode('calendar') : setMode('draw');
    }

    return (
        <div className='layout' style = {{background: getLayoutStyling()}}>
            <div className='header'>
                <Tab mode={mode} swapMode={swapMode}/>
            </div>
            <div className='content'>
                {mode === 'draw' ? <Canvas /> : <Calendar testing={false} />}
            </div>
        </div>
    );
}

export default App;
