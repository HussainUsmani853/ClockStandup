import firepadRef, { userName } from './server/firebase.js';
import './App.css';

function App() {
  return (
    <div className="App">{userName}</div>
  );
}

export default App;
