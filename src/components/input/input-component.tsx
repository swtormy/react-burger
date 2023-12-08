import React from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

type Props = {
    placeholder: string;
    name: string;
    value: string;
    icon?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<Props> = ({ placeholder, name, value, icon, onChange }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const onIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        alert('Icon Click Callback');
    };
    return (
        <Input
            type={'text'}
            placeholder={placeholder}
            onChange={onChange}
            icon={icon as keyof TICons}
            value={value}
            name={name}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
        />
    )
}

export default InputComponent