import './App.css';
import Canvas from './components/Canvas.js'
import Calendar from './components/Calendar.js'

function App() {
  return (
    <div className='layout'>
      <Calendar user='dummy_user' />
      {/* <h1>How are you feeling today?</h1> */}
      <div>
        <Canvas title="Draw how you're feeling today!" />
      </div>
    </div>
  );
}

export default App;
