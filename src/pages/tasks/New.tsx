import React from "react";
import Form from "../../components/Form";
import Input from "../../components/InputText";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskSchema from '../../schema/taskSchema';
import { TaskName } from '../../types/types';
import { useRouter } from 'next/router'
import { Title } from '@mantine/core';

const New = ({ fetchTasks, setOpened }: any) => {
    const router = useRouter()
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<TaskName>({
        resolver: yupResolver(taskSchema),
    });

    const handleAdd = async (data: TaskName) => {
        try {
            const response = await fetch('/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data }),
            });

            if (response.ok) {
                const createdTask = await response.json();
                if (fetchTasks) {
                    // if this is inside modal
                    fetchTasks()
                    setOpened(false)
                } else {
                    // if this from url
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onSubmit: SubmitHandler<TaskName> = (data) => {
        handleAdd({ ...data })
    };
    return (
        <div className={`${!fetchTasks && 'flex items-center justify-center min-h-screen'}`}>
            <div className={`${!fetchTasks && 'w-full max-w-md bg-white p-6 rounded-lg shadow-md'}`}>
                {!fetchTasks &&
                    <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                        Add Task
                    </Title>
                }
                <Form
                    buttonLabel="Add"
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                >
                    <Input
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
