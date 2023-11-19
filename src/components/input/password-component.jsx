import React from 'react'
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const PasswordComponent = ({value, onChange, placeholder}) => {
    
    return (
        <PasswordInput
            onChange={onChange}
            value={value}
            name={"Пароль"}
            placeholder={placeholder}
            extraClass="mb-2"
        />
    )
}

PasswordComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default PasswordComponent