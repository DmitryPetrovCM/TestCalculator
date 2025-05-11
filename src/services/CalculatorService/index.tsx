import { createContext, ReactNode, useContext } from 'react';

export enum CALCULATIONS_ERRORS {
  DEFAULT = 'ошибка'
}
type TCalculationError = CALCULATIONS_ERRORS.DEFAULT;
export type TCalculationResult = number | TCalculationError;

interface ICalculatorServiceContext {
  calculateExpression: (exp: string) => number | TCalculationError;
}

interface ICalculatorServiceProviderProps {
  children: ReactNode;
}

export const CalculatorServiceContext = createContext<ICalculatorServiceContext>(null);

export const CalculatorServiceProvider = ({ children }: ICalculatorServiceProviderProps) => {
  const LOWEST_PRIORITY = 0;
  const OPERATORS_PRIORITY: { [key: string]: number } = {
    ')': 1,
    '(': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
  };

  const OPERATIONS: { [key: string]: (leftOperand: number, rightOperand: number) => number } = {
    '+': (leftOperand: number, rightOperand: number) => leftOperand + rightOperand,
    '-': (leftOperand: number, rightOperand: number) => leftOperand - rightOperand,
    '*': (leftOperand: number, rightOperand: number) => leftOperand * rightOperand,
    '/': (leftOperand: number, rightOperand: number) => leftOperand / rightOperand,
  };

  const BRACKETS = {
    OPEN: '(',
    CLOSE: ')',
  }

  const extractStackUntilOpenBracket = (stack: string[], result: string[]): void => {
    let stackHasOpenBracket = false;

    while (stack.length) {
      const operator = stack.shift();

      if (operator === BRACKETS.OPEN) {
        stackHasOpenBracket = true;
        break;
      }

      if (operator !== undefined) {
        result.push(operator);
      }
    }

    if (!stackHasOpenBracket) {
      throw new Error('ошибка в порядке скобок (открывающая скобка не найдена)');
    }
  }

  const extractStackUntilLowerPriorityOperation = (operationPriority: number, stack: string[], result: string[]): void => {
    while (stack.length && OPERATORS_PRIORITY[stack[0]] >= operationPriority) {
      const operation = stack.shift();

      if (operation !== undefined) {
        result.push(operation);
      }
    }
  }

  const convertExpressionToReversePolishNotation = (expression: string[]): string[] => {
    const stack: string[] = [];
    const result: string[] = [];

    for (const symbol of expression) {
      if (symbol === BRACKETS.OPEN) {
        stack.unshift(symbol);
        continue;
      }

      if (symbol === BRACKETS.CLOSE) {
        extractStackUntilOpenBracket(stack, result);
        continue;
      }

      const isOperand = !OPERATIONS.hasOwnProperty(symbol);

      if (isOperand) {
        result.push(symbol);
        continue;
      }

      const stackFirstOperatorPriority = OPERATORS_PRIORITY[stack[0]] || LOWEST_PRIORITY;
      const symbolOperatorPriority = OPERATORS_PRIORITY[symbol];

      if (symbolOperatorPriority > stackFirstOperatorPriority) {
        stack.unshift(symbol);
      } else {
        extractStackUntilLowerPriorityOperation(symbolOperatorPriority, stack, result);
        stack.unshift(symbol);
      }
    }

    return [...result, ...stack];
  }

  const removeSpaces = (expression: string): string => {
    return expression.replace(/\s+/g, '');
  }

  const isInitialExpressionValid = (expression: string): boolean => {
    return Boolean(expression.match(/^[\d+\-*\/()\s]*$/));
  }

  const parseInitialExpression = (expression: string): string[] => {
    return expression.split(/([+\-*\/()]|[\d]+)/g).filter(Boolean);
  }

  const calculateExpression: ICalculatorServiceContext['calculateExpression'] = (expression: string): TCalculationResult => {
    try {
      const spacesLessExpression = removeSpaces(expression);

      if (!isInitialExpressionValid(spacesLessExpression)) {
        throw new Error('обнаружены некорректные символы');
      }

      const parsedExpression = parseInitialExpression(spacesLessExpression);
      const convertedToPolishExpression = convertExpressionToReversePolishNotation(parsedExpression);
      const stack: (string | number)[] = [];

      for (const symbol of convertedToPolishExpression) {
        const isOperand = !OPERATIONS.hasOwnProperty(symbol);

        if (isOperand) {
          stack.unshift(symbol);
          continue;
        }

        const rightOperand = stack.shift();
        const leftOperand = stack.shift();

        if (leftOperand === undefined || rightOperand === undefined) {
          throw new Error('Скорее всего, ошибка в выражении. Перепроверьте');
        }

        stack.unshift(OPERATIONS[symbol](+leftOperand, +rightOperand));
      }

      if (stack.length !== 1) {
        throw new Error('Скорее всего, ошибка в выражении. Перепроверьте');
      }

      return +stack[0];
    } catch (err: unknown) {
      console.error(err);
      return CALCULATIONS_ERRORS.DEFAULT;
    }
  }

  calculateExpression('1+2-5*7/(8-2*2)-7*(1+2)/3');
  console.log('1 (expected 19) ---- 7+(5-2)*4 = ', calculateExpression('7+(5-2)*4'));
  console.log('2 (expected -12.75) ---- 1+2-5*7/(8-2*2)-7*(1+2)/3 = ', calculateExpression('1+2-5*7/(8-2*2)-7*(1+2)/3'));
  console.log('3 (expected 17.25)---- 1+32-5*7/(8-2*2)-7*(1+2)/3 = ', calculateExpression('1+32-5*7/(8-2*2)-7*(1+2)/3'));

  return (
    <CalculatorServiceContext.Provider
      value={{ calculateExpression }}>
      {children}
    </CalculatorServiceContext.Provider>
  );
};

export const useCalculatorService = (): ICalculatorServiceContext => {
  const { calculateExpression } = useContext(CalculatorServiceContext);

  return { calculateExpression };
};
