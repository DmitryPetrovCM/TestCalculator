import { ChangeEvent, FC, memo } from 'react';
import styles from './Calculator.module.css';
import classNames from 'classnames';

export interface ICalculatorOperator {
  label?: string;
  value: string;
}

export interface ICalculatorProps {
  displayValue: string | number;
  operators?: ICalculatorOperator[];
  onButtonClick(value: string): void;
  onInputChange(value: string): void;
  onCalculate(): void;
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const DEFAULT_OPERATORS: ICalculatorOperator[] = [
  { value: '+' },
  { value: '-' },
  { value: '*' },
  { value: '/' },
  { value: '(' },
  { value: ')' },
];

export const Calculator: FC<ICalculatorProps> = memo(({
  displayValue,
  operators = DEFAULT_OPERATORS,
  onButtonClick,
  onInputChange,
  onCalculate,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onInputChange(event.target.value);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.inputContainer}>
        <input type="text" value={displayValue} onChange={handleInputChange} className={styles.displayInput} />
      </div>
      <div className={styles.keyboardContainer}>
        <div className={classNames(styles.digitsKeyboard, styles.keyboard)}>
          {DIGITS.map((digit) => (
            <button key={digit} onClick={() => onButtonClick(digit)} className={classNames(styles.button, styles.digitButton)}>
              {digit}
            </button>
          ))}
        </div>
        <div className={`${styles.actionsKeyboard} ${styles.keyboard}`}>
          {operators.map(({ value, label }) => (
            <button key={value} onClick={() => onButtonClick(value)} className={classNames(styles.button, styles.operatorButton)}>
              {label || value}
            </button>
          ))}
          <button onClick={onCalculate} className={classNames(styles.button, styles.equalsOperatorButton)}> = </button>
        </div>
      </div>
    </div>
  );
});