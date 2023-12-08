import React from 'react'
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'


type Props = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: string;
}

const PasswordComponent: React.FC<Props> = ({ value, onChange, placeholder, icon }) => {
    const getValidIcon = (iconName?: string): 'ShowIcon' | 'HideIcon' | 'EditIcon' | undefined => {
        const validIcons = ['ShowIcon', 'HideIcon', 'EditIcon'];
        return validIcons.includes(iconName ?? '') ? iconName as 'ShowIcon' | 'HideIcon' | 'EditIcon' : undefined;
    };
    return (
        <PasswordInput
            onChange={onChange}
            value={value}
            name={"password"}
            placeholder={placeholder}
            extraClass="mb-2"
            icon={getValidIcon(icon)}
        />
    )
}


export default PasswordComponent