import './App.css';
import Canvas from './components/Canvas.js'

function App() {
  return (
    <div className='layout'>
      {/* <h1>How are you feeling today?</h1> */}
      <div>
        <Canvas title="Draw how you're feeling today!" />
      </div>
    </div>
  );
}

export default App;
