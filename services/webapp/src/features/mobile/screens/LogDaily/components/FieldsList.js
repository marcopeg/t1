/* eslint-disable */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FieldTemperature from '../../../components/FieldTemperature'
import FieldOptions from '../../../components/FieldOptions'

const fieldTypes = {
    temperature: FieldTemperature,
    options: FieldOptions,
}

const mapState = ({ dailyRecords }) => ({
    fields: dailyRecords.fields,
})

const FieldsList = ({ fields, values }) => {
    const [ currentValues, setCurrentValues ] = useState({})

    const setFieldValue = (name, value) => {
        setCurrentValues({
            ...currentValues,
            [name]: value,
        })
    }

    return (
        <div>
            {fields
                .filter(field => fieldTypes[field.type])
                .map(field => {
                    return React.createElement(fieldTypes[field.type], {
                        ...field,
                        value: currentValues[field.name],
                        key: field.name,
                        setValue: value => setFieldValue(field.name, value),
                    })
                })}
        </div>
    )
}

FieldsList.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })).isRequired,
}

export default connect(mapState)(FieldsList)
