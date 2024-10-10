import React, { useState } from 'react';
import { Text } from '@mantine/core';
import CustomButton from './CustomButton';
import CommonModal from './CustomModal';
import { TodoListProps } from '../types/types';
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const TodoList: React.FC<TodoListProps> = ({ tasks, fetchTasks }) => {
    const router = useRouter()
    
    const [taskType, setTaskType] = useState("");
    const [openedTaskId, setOpenedTaskId] = useState<number | null>(null);


    const handleEdit = (taskId: number) => {
        router.push(`tasks/${taskId}/edit`)
    };

    const handleDelete = async (taskId: number) => {
        setTaskType("Delete")
        setOpenedTaskId(taskId);
    }

    const mutation = useMutation({
        mutationFn: (id: number) => {
            return axios.delete(`/tasks/${id}`);
        },
        onSuccess: () => {
            fetchTasks()
            setOpenedTaskId(null);
            setTaskType("")
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });

    const handleDeleteData = async () => {
        if (!openedTaskId) {
            return;
        }

        mutation.mutate(openedTaskId);
    };

    return (
        <div className="h-96 overflow-y-auto scrollbar-none">
            {!tasks.length ? (
                <p className="text-gray-500 text-center">No tasks available. Add tasks to your to-do list.</p>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task, index) => (
                        <div
                            key={task.id}
                            className="py-4 m-1 w-full bg-white shadow-md rounded-xl px-6 flex flex-col sm:flex-row items-start justify-between"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center w-full">
                                <div className="p-2 flex-1">
                                    <Text color="dimmed">Task {index + 1}</Text>
                                    <Text size="md">{task?.taskName}</Text>
                                </div>
                            </div>

                            <div className="p-2 flex gap-2 mt-4 sm:mt-0">
                                <CustomButton
                                    variant="filled"
                                    color="lime"
                                    radius="md"
                                    onClick={() =>
                                        handleEdit(task.id)
                                    }
                                    svgIcon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                        >
                                            <path d="M3 17.25V21h3.75l11.07-11.07-3.75-3.75L3 17.25zm15.66-11.88l1.42 1.42a2.001 2.001 0 0 0 0-2.83l-1.42-1.42a2.001 2.001 0 0 0-2.83 0l-1.42 1.42 3.75 3.75z" />
                                        </svg>
                                    }
                                >
                                    Edit
                                </CustomButton>

                                <CustomButton
                                    variant="filled"
                                    color="red"
                                    radius="md"
                                    onClick={() => handleDelete(task.id)}
                                    svgIcon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                        >
                                            <path d="M3 6l3 18h12l3-18H3zm3-3h12a1 1 0 0 1 1 1v1H5V4a1 1 0 0 1 1-1z" />
                                        </svg>
                                    }
                                >
                                    Delete
                                </CustomButton>
                            </div>

                            {/* Modal for deleting task */}
                            <CommonModal
                                setOpened={(open) => setOpenedTaskId(open ? task.id : null)}
                                opened={openedTaskId === task.id}
                                title={`${taskType} Task`}
                                trigger={<></>}
                            >
                                <div className="mt-4 flex justify-center item-center flex-col  ">
                                    <p className="pb-4 text-center">Are you sure you want to delete the task?</p>
                                    <CustomButton
                                        variant="filled"
                                        color="red"
                                        radius="md"
                                        onClick={handleDeleteData}
                                    >
                                        Delete
                                    </CustomButton>
                                </div>
                            </CommonModal>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoList;
