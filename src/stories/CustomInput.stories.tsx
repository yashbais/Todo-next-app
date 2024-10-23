import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider, UseFormRegisterReturn } from 'react-hook-form';
import CustomInput from '../components/CustomInput'; 

const meta: Meta<typeof CustomInput> = {
    title: 'Components/CustomInput',
    component: CustomInput,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        name: { control: 'text' },
        type: { control: 'text' },
        label: { control: 'text' },
        error: { control: 'text' },
        size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
    },
};

export default meta;
type Story = StoryObj<typeof CustomInput>;

const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockRegister = (name: string): UseFormRegisterReturn<any> => ({
    name,
    onChange: async () => {}, 
    onBlur: async () => {}, 
    ref: () => {},
});

export const Default: Story = {
    render: () => (
        <FormWrapper>
            <CustomInput
                name="taskName"
                label="Task Name"
                type="text"
                error=""
                placeholder="Enter task name"
                register={mockRegister} 
            />
        </FormWrapper>
    ),
};

export const WithError: Story = {
    render: () => (
        <FormWrapper>
            <CustomInput
                name="taskName"
                label="Task Name"
                type="text"
                placeholder="Enter task name"
                error="This field is required"
                register={mockRegister}
            />
        </FormWrapper>
    ),
};
