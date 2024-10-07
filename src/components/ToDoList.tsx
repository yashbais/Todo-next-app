import { TodoListProps } from '../types/types'
import React from 'react';
import { Text } from '@mantine/core';
import CustomButton from '../components/utils/CustomButton';
import { HandleCapitalFirstLetter } from '../components/utils/HandleCapitalFirstLetter';

const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="h-96 overflow-y-auto scrollbar-none">
            {/* Conditional rendering for empty list */}
            {!tasks.length ? (
                <p className="text-gray-500 text-center">No tasks available. Add tasks to your to-do list.</p>
            ) : (<div className="space-y-4">

                {tasks.map((singleTask, index) => (
                    <div key={index} className='py-4 m-1 w-full bg-white shadow-md rounded-xl px-6 flex flex-col sm:flex-row items-start justify-between'>
                        <div className='flex flex-col sm:flex-row sm:items-center w-full'>
                            <div className='p-2 flex-1'>
                                <Text color="dimmed">Task {index + 1}</Text>
                                <Text size="md">{HandleCapitalFirstLetter(singleTask?.taskName)}</Text>
                            </div>
                        </div>

                        <div className='p-2 flex gap-2 mt-4 sm:mt-0'>
                            <CustomButton
                                variant="filled"
                                color="lime"
                                radius="md"
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
                    </div>
                ))}
            </div>)}

        </div>
    );
}

export default ToDoList;
