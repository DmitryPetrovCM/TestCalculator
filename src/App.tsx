import './App.css';
import { AppCalculator } from './app/AppCalculator/AppCalculator.tsx';
import { CalculatorServiceProvider } from './services/CalculatorService';

const App = () => {
  return (
    <CalculatorServiceProvider>
      <AppCalculator />
    </CalculatorServiceProvider>
  );
};

export default App;
