/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, InputHTMLAttributes } from "react";
import { TextInput, MantineSize } from "@mantine/core"; // No need to import MantineSize here
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    label?: string;
    error?: string;
    register: UseFormRegister<any>;
}

const Input: FC<InputProps> = ({
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

export default Input;
