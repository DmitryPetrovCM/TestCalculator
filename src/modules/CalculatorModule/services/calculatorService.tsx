import {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import { calculateExpression } from '../utils';

export interface ICalculatorServiceContext {
  expression: string | number,
  addToExpression(value: string): void,
  setExpression(value: string): void,
  computeExpression(): void,
}

export interface ICalculatorServiceProviderProps {
  children: ReactNode;
}

const DEFAULT_CALCULATOR_CONTEXT_VALUE: ICalculatorServiceContext = {
  expression: '',
  addToExpression() {},
  setExpression(){},
  computeExpression(){},
}

export const CalculatorServiceContext = createContext<ICalculatorServiceContext>(DEFAULT_CALCULATOR_CONTEXT_VALUE);

export const CalculatorServiceProvider = ({ children }: ICalculatorServiceProviderProps) => {
  const [currentExpression, setCurrentExpression] = useState<string | number>('');

  const addToExpression = useCallback((value: string) => {
    setCurrentExpression((expression) => expression + value);
  }, []);

  const setExpression = useCallback((inputExpression: string) => {
    setCurrentExpression(inputExpression);
  }, []);

  const computeExpression = useCallback(() => {
    if (currentExpression) {
      setCurrentExpression(calculateExpression(currentExpression as string));
    }
  }, [currentExpression]);

  return (
    <CalculatorServiceContext.Provider
      value={{
        expression: currentExpression,
        addToExpression,
        setExpression,
        computeExpression,
      }}
    >
      {children}
    </CalculatorServiceContext.Provider>
  );
};

export const useCalculatorService = (): ICalculatorServiceContext => {
  return useContext(CalculatorServiceContext);
};
