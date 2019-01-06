/* eslint-disable */

import React from 'react'
import { Input } from 'components/MobilePage'

const FieldTemperature = ({ name, value, defaultValue, setValue }) => {
    console.log(name, value, defaultValue)
    return (
        <div style={{ border: '1px solid #ddd', padding: 10 }}>
            FieldTemperature:
            <Input
                value={value || defaultValue}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default FieldTemperature
