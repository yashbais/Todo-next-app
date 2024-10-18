import React, { FC } from "react";
import { TextInput } from "@mantine/core"; 
import {InputProps} from '../types/types'

const CustomInput: FC<InputProps> = ({
    name,
    type,
    error,
    label,
    register,
    size,
    ...rest
}) => {
    return (
        <div>
            <TextInput
                mt="md" 
                type={type}
                {...register(name)}
                label={label}
                error={error}
                {...rest}
            />
        </div>
    );
};

export default CustomInput;
