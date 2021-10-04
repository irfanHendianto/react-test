import './App.css';
import 'antd/dist/antd.css';
import Main from './Main'
import {ComponentProvider} from "./context/ComponentContext"

function App() {
  return (
    <div className="App">
      <ComponentProvider>
        <Main/>
      </ComponentProvider>
    </div>
  );
}

export default App;
