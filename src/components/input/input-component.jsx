import React from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const InputComponent = ({ placeholder, value, icon, onChange }) => {
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    return (
        <Input
            type={'text'}
            placeholder={placeholder}
            onChange={onChange}
            icon={icon}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
        />
    )
}

InputComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string
}

export default InputComponent