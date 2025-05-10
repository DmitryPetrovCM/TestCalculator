import { FC } from 'react';
import { Calculator } from '../../components/Calculator/Calculator.tsx';

export const AppCalculator: FC = () => {
    return (
        <div style={{ width: '400px', height: '650px' }}>
            <Calculator
                displayValue={''}
                onChange={(val) => console.log(val)}
                onCalculate={() => console.log('calculate')}
            />
        </div>
    )
}