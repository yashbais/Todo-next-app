import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomTable from '../components/CustomTable';
import { ColumnDef } from '@tanstack/react-table';

const meta: Meta<typeof CustomTable> = {
    title: 'Components/CustomTable',
    component: CustomTable,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        data: { control: 'object' },
        columns: { control: 'object' },
        totalPages: { control: 'number' },
        page: { control: 'number' },
        limit: { control: 'number' },
        sorting: { control: 'object' },
    },
};

export default meta;

type Story = StoryObj<typeof CustomTable>;

const mockData = [
    { id: 1, taskName: 'Task 1' ,action : 'edit/delete'},
    { id: 2, taskName: 'Task 2',action : 'edit/delete' },
    { id: 3, taskName: 'Task 3',action : 'edit/delete' },
    { id: 4, taskName: 'Task 4',action : 'edit/delete' },
    { id: 5, taskName: 'Task 5',action : 'edit/delete' },
    { id: 6, taskName: 'Task 6',action : 'edit/delete' },
];

const mockColumns: ColumnDef<typeof mockData[number]>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
        enableSorting: false,
    },
    {
        accessorKey: 'taskName',
        header: () => <span>Task Name</span>,
        enableSorting: true,
    },
    {
        accessorKey: 'action',
        header: () => <span>Action</span>,
        enableSorting: false,
    },
];

const applySorting = (data: any, sorting: any) => {
    if (sorting.length === 0) return data;
    const sortedData = [...data].sort((a, b) => {
        const [sort] = sorting; 
        const aValue = a[sort.id];
        const bValue = b[sort.id];
        if (aValue < bValue) return sort.desc ? 1 : -1;
        if (aValue > bValue) return sort.desc ? -1 : 1;
        return 0;
    });
    return sortedData;
};

export const Default: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(5);
        const [sorting, setSorting] = useState([]);

        const totalPages = Math.ceil(mockData.length / limit);
        
        useEffect(() => {
            if (page > totalPages) {
                setPage(1);
            }
        }, [totalPages, page]);

        const handleSortingChange = (newSorting: any) => {
            setSorting(newSorting);
            setPage(1);
        };

        const startIndex = (page - 1) * limit;
        const sortedData = applySorting(mockData, sorting);
        const paginatedData = sortedData.slice(startIndex, startIndex + limit);

        return (
            <CustomTable
                data={paginatedData}
                columns={mockColumns}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                sorting={sorting}
                setSorting={handleSortingChange}
            />
        );
    },
};

export const NoData: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(5);
        const [sorting, setSorting] = useState([]);

        const totalPages = 0;

        return (
            <CustomTable
                data={[]}
                columns={mockColumns}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                sorting={sorting}
                setSorting={() => { }}
            />
        );
    },
};
