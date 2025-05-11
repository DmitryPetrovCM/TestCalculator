import { FC, useCallback, useState } from 'react';
import { Calculator } from '../../components/Calculator/Calculator.tsx';
import { useCalculatorService } from '../../services/CalculatorService';

export const AppCalculator: FC = () => {
  const { calculateExpression } = useCalculatorService();
  const [expression, setExpression] = useState<string | number>('');

  const handleCalculatorButtonClick = useCallback((value: string) => {
    setExpression((expression) => expression + value);
  }, []);

  const handleInputChange = useCallback((inputExpression: string) => {
    setExpression(inputExpression);
  }, []);

  const handleCalculate = useCallback(() => {
    if (expression) {
      setExpression(calculateExpression(expression as string));
    }
  }, [expression]);

  return (
    <div style={{ width: '400px', height: '650px' }}>
      <Calculator
        displayValue={expression}
        onButtonClick={handleCalculatorButtonClick}
        onInputChange={handleInputChange}
        onCalculate={handleCalculate}
      />
    </div>
  );
};