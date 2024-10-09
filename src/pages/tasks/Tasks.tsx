import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import TodoList from '../../components/ToDoList';
import { Title } from '@mantine/core';
import CustomButton from '../../components/CustomButton';
import CommonModal from '../../components/CommonModal';
import CustomInput from '../../components/CustomInput';
import { Task } from '../../types/types'

const Tasks = () => {
    const [error, setError] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [opened, setOpened] = useState(false);

    // Fetch tasks from the mock API
    const fetchTasks = async () => {
        try {
            const response = await fetch("/tasks");
            if (response.ok) {
                const data = await response.json();
                console.log(data,"data")
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.log(error,"error data")
            setTasks([]);
        }
    };

    useEffect(() => {
        setTimeout(()=>{
            fetchTasks();
        },1000)
    }, []);


    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
        setError("");
    };

    const handleAdd = async () => {
        if (task.trim() === "") {
            setError("Task cannot be empty");
            return;
        }

        try {
            const response = await fetch('/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskName: task }),
            });

            if (response.ok) {
                const createdTask = await response.json();
                // setTasks((prevTasks) => [...prevTasks, createdTask]);
                fetchTasks();
                setTask("");
                setOpened(false)
            } else {
                setError("Failed to add task");
            }
        } catch (error) {
            setError("Failed to add task");
        }
    };


    return (
        <div className='bg-[#f0f2f5] flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 xl:px-96'>
            <Header />

            <div className="flex  gap-5 flex-col-reverse sm:flex-row items-baseline justify-between w-full py-5">
                <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                    Task List
                </Title>
                <CommonModal
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
                    <div className="mt-4 flex justify-center item-center flex-col  ">
                        <CustomInput
                            placeholder="Add task..."
                            value={task}
                            onChange={handleTaskChange}
                            name="task"
                            type="text"
                            error={error}
                        />
                        <CustomButton
                            variant="filled"
                            color="customPurple"
                            radius="md"
                            onClick={handleAdd}
                        >
                            Add
                        </CustomButton>

                    </div>
                </CommonModal>
            </div>

            <div className="flex flex-col w-full lg:px-0 py-5">
                <TodoList
                    tasks={tasks}
                    setTasks={setTasks}
                    fetchTasks={fetchTasks}
                />
            </div>
        </div>
    );
};

export default Tasks;
