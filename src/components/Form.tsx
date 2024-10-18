import { Button } from "@mantine/core";
import { IFormProps } from '../types/types'

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
            <Button type="submit" className="btn-submit mt-2 ">
                {buttonLabel}
            </Button>
        </form>
    );
};

export default Form;
