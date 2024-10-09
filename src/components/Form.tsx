import { ReactNode } from "react";
import { Button } from "@mantine/core";

export type childrenType = ReactNode;

export interface IFormProps<T> {
    defaultValues?: Partial<T>;
    children?: childrenType;
    buttonLabel?: string;
    onSubmit: (data: T) => void;
    handleSubmit: any
}

const Form = <T,>({
    buttonLabel = "Submit",
    children,
    onSubmit,
    handleSubmit,
}: IFormProps<T>) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-fields">
                {children}
            </div>
            <Button type="submit" className="btn-submit mt-2">
                {buttonLabel}
            </Button>
        </form>
    );
};

export default Form;
