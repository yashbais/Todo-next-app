import useStore from '../stores/useStore';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from '../types/types';
import userSchema from '../schema/userSchema';
import Form from './Form'
import Input from './CustomInput'

const UserRegistration = () => {

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<User>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit: SubmitHandler<User> = (data) => {
        setUser(data);
    };

    const { setUser, user } = useStore(); 
   
    if (user) return null;

    return (
        <>
            <Form
                buttonLabel="Register"
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            >
                <Input
                    name="name"
                    label="User Name"
                    type="text"
                    placeholder="Enter name"
                    error={errors.name?.message}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    register={register}
                />

                <Input
                    name="email"
                    label="User Email"
                    type="text"
                    placeholder="Enter email"
                    error={errors.email?.message}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    register={register}
                />
            </Form>
        </>
    );
};

export default UserRegistration;
