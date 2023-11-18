import React from 'react'
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const PasswordComponent = ({password}) => {
    const [value, setValue] = React.useState(password)
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <PasswordInput
            onChange={onChange}
            value={value}
            name={'password'}
            extraClass="mb-2"
        />
    )
}

PasswordComponent.propTypes = {
    password: PropTypes.string,
}

export default PasswordComponent