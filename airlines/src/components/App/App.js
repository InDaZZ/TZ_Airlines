import './App.css';
import { newData } from '../../DB/sortDB'
import Tickets from '../Tickets/Tickets';

function App() {
  console.log(newData)
  return (
    <div className="App">
      <Tickets flights={newData.result.flights}></Tickets>
    </div>
  );
}
export default App;
