import React from "react";
import Form from "../../components/Form";
import CustomInput from "../../components/CustomInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskSchema from '../../schema/taskSchema';
import { TaskName,NewComponentProps } from '../../types/types';
import { useRouter } from 'next/router';
import { Title } from '@mantine/core';
import { useMutation ,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

const New = ({  setOpened }: NewComponentProps) => {
    const router = useRouter();
    const isNewTaskPage = router.pathname.includes('/tasks/new');
    const queryClient = useQueryClient();


    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<TaskName>({
        resolver: yupResolver(taskSchema),
    });

    const mutation = useMutation({
        mutationFn: (newTask: TaskName) => {
            return axios.post('/tasks', newTask); 
        },
        onSuccess: (data) => {
            //  invalidate tasks and close the modal
            if (!isNewTaskPage) {
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
                setOpened(false);
            } else {
                // Navigate to the home page if task is created from a URL route
                router.push('/');
            }
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });

    const onSubmit: SubmitHandler<TaskName> = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className={`${isNewTaskPage && 'flex items-center justify-center min-h-screen'}`}>
            <div className={`${isNewTaskPage && 'w-full max-w-md bg-white p-6 rounded-lg shadow-md'}`}>
                {isNewTaskPage && (
                    <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                        Add Task
                    </Title>
                )}
                <Form
                    buttonLabel="Add"
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                >
                    <CustomInput
                        name="taskName"
                        label="Task Name"
                        type="text"
                        placeholder="Enter task name"
                        error={errors.taskName?.message}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        register={register}
                    />
                </Form>
            </div>
        </div>
    );
};

export default New;
