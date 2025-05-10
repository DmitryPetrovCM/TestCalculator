import { FC } from 'react';
import classNames from 'classnames';
import styles from './Calculator.module.css';

export interface ICalculatorOperator {
    label?: string;
    value: string;
}

export interface ICalculatorProps {
    displayValue: string;
    operators?: ICalculatorOperator[];
    onChange(value: number | string): void;
    onCalculate(): void;
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const DEFAULT_OPERATORS: ICalculatorOperator[] = [
    { value: '+' },
    { value: '-' },
    { value: '*' },
    { value: '/' },
    { value: '(' },
    { value: ')' },
]

export const Calculator: FC<ICalculatorProps> = ({
    displayValue,
    operators = DEFAULT_OPERATORS,
    onChange,
    onCalculate,
}) => {

    return (
        <div className={styles.calculator}>
            <div className={styles.inputContainer}>
                <input type="text" value={displayValue} className={styles.displayInput}/>
            </div>
            <div className={styles.keyboardContainer}>
                <div className={classNames(styles.digitsKeyboard, styles.keyboard)}>
                    {DIGITS.map((digit) => (
                        <button key={digit} onClick={() => onChange(digit)} className={styles.button}>
                            {digit}
                        </button>
                    ))}
                </div>
                <div className={`${styles.actionsKeyboard} ${styles.keyboard}`}>
                    {operators.map(({value, label}) => (
                        <button key={value} onClick={() => onChange(value)} className={styles.button}>
                            {label || value}
                        </button>
                    ))}
                    <button onClick={onCalculate} className={styles.button}> = </button>
                </div>
            </div>
        </div>
    )
}