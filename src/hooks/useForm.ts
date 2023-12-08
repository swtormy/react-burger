import React from 'react'
import { TFormValues } from '../utils/models';

export function useForm(inputValues: TFormValues = {}) {
    const [values, setValues] = React.useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}