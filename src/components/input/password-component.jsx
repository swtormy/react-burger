import React from 'react'
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const PasswordComponent = ({value, onChange, placeholder, icon}) => {
    
    return (
        <PasswordInput
            onChange={onChange}
            value={value}
            name={"password"}
            placeholder={placeholder}
            extraClass="mb-2"
            icon={icon ? icon : "ShowIcon"}
        />
    )
}

PasswordComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.string
}

export default PasswordComponent