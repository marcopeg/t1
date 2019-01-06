/* eslint-disable */

import React from 'react'
import { Title, Text, Button } from 'components/MobilePage'

const FieldTemperature = ({ name, label, value, defaultValue, setValue }) => {
    const getValue = () =>
        Math.round(parseFloat(value || defaultValue) * 100) / 100

    const increment = () =>
        setValue(getValue() + 0.1)
    
    const decrement = () =>
        setValue(getValue() - 0.1)

    return (
        <div>
            <Title>{label}</Title>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
            }}>
                <Button onClick={decrement}>-</Button>
                <Text size={'xl'}>{getValue()}</Text>
                <Button onClick={increment}>+</Button>
            </div>
        </div>
    )
}

export default FieldTemperature
