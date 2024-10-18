import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import TodoList from '../../components/ToDoList';
import { Title } from '@mantine/core';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import { Task, TaskName } from '../../types/types'
import New from './New';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch tasks from the mock API
    const fetchTasks = async () => {
        try {
            const response = await fetch("/tasks");
            if (response.ok) {
                const data = await response.json();
                console.log(data, "data")
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            } else {
                setTasks([]);
            }
            setLoading(false)
        } catch (error) {
            console.log(error, "error data")
            setTasks([]);
            setLoading(false)
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchTasks();
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <div className='bg-[#f0f2f5] flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 xl:px-96'>
            <Header />

            <div className="flex  gap-5 flex-col-reverse sm:flex-row items-baseline justify-between w-full py-5">
                <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                    Task List
                </Title>

                <CustomModal
                    setOpened={setOpened}
                    opened={opened}
                    title="Add Task"
                    trigger={
                       <>
                         <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width="16"
                                height="16"
                                fill="currentColor"
                                style={{ marginRight: 8 }}
                            >
                                <path d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
                            </svg>
                            Add Task
                            </>
                    }
                >
                    <div className="mt-4 flex justify-center item-center flex-col  ">
                        <New
                            fetchTasks={fetchTasks}
                            setOpened={setOpened}
                        />
                    </div>
                </CustomModal>
            </div>

            <div className="flex flex-col w-full lg:px-0 py-5">
                {loading ? (
                    <p className='flex justify-center items-center'>Loading....</p>
                ) : (
                    <TodoList
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                    />
                )}
            </div>
        </div>
    );
};

export default Tasks;
