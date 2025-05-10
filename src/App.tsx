import './App.css';
import {AppCalculator} from "./app/AppCalculator/AppCalculator.tsx";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
        <AppCalculator />
    </div>
  );
};

export default App;
