import React, { useState, useEffect, useMemo } from 'react';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';
import CustomTable from './CustomTable';
import { TodoListProps, Task, TaskName } from '../types/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from './Form';
import Input from './CustomInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import taskSchema from '../schema/taskSchema';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

const TodoList: React.FC<TodoListProps> = ({ tasks,
    fetchTasks, totalPages, page, setPage, limit,
    setLimit, sorting, setSorting }) => {

    const [taskType, setTaskType] = useState('');
    const [openedTaskId, setOpenedTaskId] = useState<number | null>(null);
    const [queryEnabled, setQueryEnabled] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
    } = useForm<TaskName>({
        resolver: yupResolver(taskSchema),
    });


    const { data } = useQuery({
        queryKey: ['tasks', openedTaskId],
        queryFn: () => axios.get(`/tasks/${openedTaskId}`),
        enabled: queryEnabled,
    });

    useEffect(() => {
        if (data) {
            setValue('taskName', data?.data?.taskName);
            setQueryEnabled(false);
        }
    }, [data]);


    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            return axios.delete(`/tasks/${id}`);
        },
        onSuccess: () => {
            fetchTasks();
            setOpenedTaskId(null);
            setTaskType('');
        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });

    const editMutation = useMutation({
        mutationFn: (taskData: TaskName) => {
            return axios.put(`/tasks/${openedTaskId}`, { taskName: taskData.taskName });
        },
        onSuccess: () => {
            fetchTasks();
            setOpenedTaskId(null);
            setTaskType('');
        },
        onError: (error) => {
            console.error('Error editing task:', error);
        },
    });

    const handleDeleteData = () => {
        if (openedTaskId !== null) {
            deleteMutation.mutate(openedTaskId);
        }
    };

    const handleEdit = (taskId: number) => {
        setQueryEnabled(true);
        setTaskType('Edit');
        setOpenedTaskId(taskId);
    };

    const handleDelete = (taskId: number) => {
        setTaskType('Delete');
        setOpenedTaskId(taskId);
    };

    const onSubmit: SubmitHandler<TaskName> = (taskData) => {
        editMutation.mutate(taskData);
    };

    const columns: ColumnDef<Task>[] = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: false,
        },
        {
            accessorKey: 'taskName',
            header: 'Tasks',
            enableSorting: true,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="p-2 flex gap-7 mt-4 sm:mt-0 ">
                    <ActionIcon onClick={() => handleEdit(row.original.id)} aria-label="edit" size="lg">
                        <IconPencil size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleDelete(row.original.id)} aria-label="delete" size="lg">
                        <IconTrash stroke={2} />
                    </ActionIcon>
                </div>
            ),
            enableSorting: false,
        },
    ], []);


    return (
        <>
            <div className="p-4 ">
                <CustomTable
                    data={tasks}
                    columns={columns}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    sorting={sorting}
                    setSorting={setSorting}
                />
            </div>

            {/* Modal for task actions */}
            <CustomModal
                setOpened={(open) => setOpenedTaskId(open ? openedTaskId : null)}
                opened={openedTaskId !== null}
                title={`${taskType} Task`}
            >
                {taskType === 'Delete' ? (
                    <div className="mt-4 flex justify-center items-center flex-col">
                        <p className="pb-4 text-center">
                            Are you sure you want to delete the task with ID {openedTaskId}?
                        </p>
                        <CustomButton
                            variant="filled"
                            color="red"
                            radius="md"
                            onClick={handleDeleteData}
                        >
                            Delete
                        </CustomButton>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
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
                    </div>
                )}
            </CustomModal>

        </>
    );
};

export default TodoList;
