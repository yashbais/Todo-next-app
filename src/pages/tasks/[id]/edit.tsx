import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {  TaskName } from '../../../types/types'
import taskSchema from '@/schema/taskSchema'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../../components/Form'
import CustomInput from '../../../components/CustomInput'
import { Title } from '@mantine/core';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const customStyle = 'flex items-center justify-center min-h-screen'

const edit = () => {

    const router = useRouter()
    const { id } = router.query

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
    } = useForm<TaskName>({
        resolver: yupResolver(taskSchema),
    });

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['tasks', id],
        queryFn: () => axios.get(`/tasks/${id}`),
        enabled: !!router.query.id,
    });

    useEffect(() => {
        if (data) {
            setValue('taskName', data?.data?.taskName)
        }
    }, [data]);

  

    const mutation = useMutation({
        mutationFn: (data: TaskName) => {
            return axios.put(`/tasks/${id}`, { taskName: data.taskName });
        },
        onSuccess: () => {
            router.push('/');
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });

    const onSubmit: SubmitHandler<TaskName> = (data) => {
        mutation.mutate(data);
    };

    if (isLoading) { return <div className={customStyle}>Loading...</div> }

    if (isError) { return <div className={customStyle}>Error fetching: {error.message}</div>; }

    return (

        <div className={customStyle}>
            <div className={`w-full max-w-md bg-white p-6 rounded-lg shadow-md`}>
                <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                    Edit Task
                </Title>
                <Form
                    buttonLabel="Update"
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
    )
}

export default edit


