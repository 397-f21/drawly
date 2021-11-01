import {useState} from 'react'
import './App.css';
import Canvas from './components/Canvas.js'
import Calendar from './components/Calendar.js'
import Tab from './components/Tab.js'

const today = new Date();

export const isMorning = (time) => {
    return time.getHours() > 0 && time.getHours() <= 12;
}

export const isAfternoon = (time) => {
    return time.getHours() > 12 && time.getHours() <= 18
}

const getLayoutStyling = (today) => {
    return isMorning(today) ? 'morning-layout' : isAfternoon(today) ? 'afternoon-layout' : 'evening-layout';
}

function App() {

    const [mode, setMode] = useState('draw');

    const swapMode = () => {
        mode === 'draw' ? setMode('calendar') : setMode('draw');
    }

    return (
        <div className={getLayoutStyling(today)}>
            <div className='header'>
                <Tab mode={mode} swapMode={swapMode}/>
            </div>
            <div className='content'>
                {mode === 'draw' ? <Canvas /> : <Calendar user='dummy_user'/>}
            </div>
        </div>
    );
}

export default App;
