import './App.css';
import {AppCalculator} from "./app/AppCalculator/AppCalculator.tsx";
import { CalculatorServiceProvider } from './services/CalculatorService';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <CalculatorServiceProvider>
        <AppCalculator />
      </CalculatorServiceProvider>
    </div>
  );
};

export default App;
