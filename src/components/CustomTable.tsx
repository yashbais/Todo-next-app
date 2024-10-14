import React from 'react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
} from '@tanstack/react-table';
import { Table, Text, Center, Pagination, Select } from '@mantine/core';
import { TableProps } from '../types/types';

const ReusableTable = <TData extends object>({
    data,
    columns,
    totalPages,
    page,
    setPage,
    limit,
    setLimit,
}: TableProps<TData> & {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
}) => {
    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                {/* Table Head */}
                <Table.Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Table.Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <Table.Th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Thead>

                {/* Table Body */}
                <Table.Tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <Table.Tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Table.Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={columns.length}>
                                <Center py="md">
                                    <Text>No rows found</Text>
                                </Center>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>

            {/* Pagination controls */}
            <div className="flex justify-end items-baseline space-x-2 mt-2 flex-wrap gap-2">
                <Text className="mb-2 md:mb-0">Rows per page</Text>

                {/* Select Field */}
                <Select
                    value={String(limit)}
                    onChange={(value) => {
                        if (value) {
                            setLimit(Number(value));
                        }
                    }}
                    data={[
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                    ]}
                    placeholder="Select limit"
                    style={{ width: '70px' }}
                />

                <Pagination
                    value={page}
                    onChange={(newPage) => setPage(newPage)}
                    total={totalPages}
                    siblings={1}
                    boundaries={1}
                />
            </div>
        </>
    );
};

export default ReusableTable;
