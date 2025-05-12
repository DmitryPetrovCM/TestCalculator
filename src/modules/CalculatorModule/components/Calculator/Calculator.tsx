import { FC } from 'react';
import { CalculatorView } from '../../views/CalculatorView/CalculatorView.tsx';
import { CalculatorServiceProvider, useCalculatorService } from '../../services/calculatorService.tsx';

export const CalculatorComponent: FC = () => {
  const { expression, setExpression, addToExpression, computeExpression } = useCalculatorService();

  return (
    <div style={{ width: '400px', height: '650px' }}>
      <CalculatorView
        displayValue={expression}
        onButtonClick={addToExpression}
        onInputChange={setExpression}
        onCalculate={computeExpression}
      />
    </div>
  );
};

export const Calculator: FC = () => (
  <CalculatorServiceProvider>
    <CalculatorComponent />
  </CalculatorServiceProvider>
);