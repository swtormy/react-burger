import React from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const InputComponent = ({ placeholder, value_string, icon }) => {
    const [value, setValue] = React.useState(value_string)
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    return (
        <Input
            type={'text'}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
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
    value_string: PropTypes.string,
    icon: PropTypes.string
}

export default InputComponent