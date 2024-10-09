import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Task, TaskName } from '../../../types/types'
import taskSchema from '@/schema/taskSchema'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../../components/Form'
import Input from '../../../components/InputText'
import { Title } from '@mantine/core';

const edit = () => {

    const router = useRouter()
    const { id } = router.query

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        watch,
    } = useForm<TaskName>({
        resolver: yupResolver(taskSchema),
    });

    const watchValues = watch()

    const fetchSingleTask = async () => {
        try {
            const response = await fetch(`/tasks/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data, "singleData")
                setValue('taskName', data?.taskName)
            } else {
                console.log("Failed to fetch task data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSingleTask()
        }
    }, [id])

    const handleUpdate = async (data: TaskName) => {
        try {
            const response = await fetch(`/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskName: data?.taskName }),
            });

            if (response.ok) {
                const updatedTask: Task = await response.json();
                router.push('/')

            } else {

            }
        } catch (error) {
            console.log(error)
        }
    };

    const onSubmit: SubmitHandler<TaskName> = (data) => {
        handleUpdate({ ...data })
    };

    return (

        <div className={`flex items-center justify-center min-h-screen`}>
            {!watchValues?.taskName ?
                <div className={`w-full max-w-md bg-white p-6 rounded-lg shadow-md`}>
                    Oops no data found for this id: {id}
                </div>
                :
                <div className={`w-full max-w-md bg-white p-6 rounded-lg shadow-md`}>
                    <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                        Edit Task
                    </Title>
                    <Form
                        buttonLabel="Update"
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
                </div>}
        </div>
    )
}

export default edit


