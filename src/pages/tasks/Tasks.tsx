import New from './New';
import axios from 'axios';
import { Title } from '@mantine/core';
import { Task } from '../../types/types';
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import TodoList from '../../components/TodoList';
import React, { useState, useEffect } from 'react';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';

const Tasks = () => {
    const [opened, setOpened] = useState(false);
    const [queryEnabled, setQueryEnabled] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Delay query by 1 second to initialize MSW
    useEffect(() => {
        const timer = setTimeout(() => {
            setQueryEnabled(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const { data, error, isError, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => axios.get("/tasks"),
        enabled: queryEnabled, // The query will run only when queryEnabled is true
    });

    useEffect(() => {
        if (data) {
            setTasks(data.data);
        }
    }, [data]);

    const handleRefetch = async (): Promise<void> => {
        await refetch(); 
    };

    if (isError) {
        return <div>Error fetching: {error.message}</div>;
    }


    return (
        <div className='bg-[#f0f2f5] flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 xl:px-96'>
            <Header />

            <div className="flex gap-5 flex-col-reverse sm:flex-row items-baseline justify-between w-full py-5">
                <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                    Task List
                </Title>

                <CustomModal
                    setOpened={setOpened}
                    opened={opened}
                    title="Add Task"
                    trigger={
                        <CustomButton
                            variant="filled"
                            color="customPurple"
                            radius="md"
                            svgIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                >
                                    <path d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
                                </svg>
                            }
                        >
                            Add Task
                        </CustomButton>
                    }
                >
                    <div className="mt-4 flex justify-center item-center flex-col">
                        <New fetchTasks={handleRefetch} setOpened={setOpened} />
                    </div>
                </CustomModal>
            </div>

            {isLoading || isFetching ? (
                <div>Loading tasks...</div>
            ) : (
                <div className="flex flex-col w-full lg:px-0 py-5">
                    <TodoList
                        tasks={tasks || []}
                        fetchTasks={handleRefetch}
                    />
                </div>
            )}
        </div>
    );
};

export default Tasks;
