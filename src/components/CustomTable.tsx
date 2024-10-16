import React from 'react';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { Table, Text, Center, Pagination, Select } from '@mantine/core';
import { TableProps } from '../types/types';
import { IconSortAscendingLetters, IconSortDescendingLetters, IconArrowsSort } from '@tabler/icons-react';
import { CustomTableProps } from '../types/types'

const CustomTable = <TData extends object>({
    data,
    columns,
    totalPages,
    page,
    setPage,
    limit,
    setLimit,
    sorting,
    setSorting,
}: TableProps<TData> & CustomTableProps) => {
    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: { sorting },
        manualSorting: true,
        onSortingChange: (updaterOrValue) => {
            const newSorting = typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting)
                : updaterOrValue;

            const sortedColumn = columns.find(
                (col) => (col as any).accessorKey === newSorting[0]?.id && (col as any).enableSorting
            );

            if (sortedColumn) {
                setSorting(newSorting);
            } else {
                setSorting([]);
            }
        },
    });


    return (
        <>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                {/* Table Head */}
                <Table.Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Table.Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Table.Th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'select-none cursor-pointer flex items-center gap-1'
                                                    : '',
                                                onClick: () => {
                                                    if (header.column.getCanSort()) {
                                                        const currentSort = header.column.getIsSorted();
                                                        const sortOrder = currentSort === 'asc' ? 'desc' : currentSort === 'desc' ? undefined : 'asc';
                                                        if (sortOrder) {
                                                            setPage(1)
                                                            setSorting([{ id: header.column.id, desc: sortOrder === 'desc' }]);
                                                        } else {
                                                            setSorting([]);
                                                        }
                                                    }
                                                },
                                            }}
                                        >
                                            {/* Render the column header */}
                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                            {/* Only show sort icon for sortable columns */}

                                            {header.column.getCanSort() && (
                                                <>
                                                    {header.column.getIsSorted() === 'asc' && (
                                                        <IconSortAscendingLetters
                                                            stroke={2}
                                                            style={{
                                                                opacity: 1, 
                                                                transition: 'transform 0.2s ease', 
                                                            }}
                                                        />
                                                    )}
                                                    {header.column.getIsSorted() === 'desc' && (
                                                        <IconSortDescendingLetters
                                                            stroke={2}
                                                            style={{
                                                                opacity: 1, 
                                                                transition: 'transform 0.2s ease', 
                                                            }}
                                                        />

                                                    )}
                                                    {header.column.getIsSorted() === false && (
                                                        <IconArrowsSort
                                                            stroke={2}
                                                            style={{
                                                                opacity: header.column.getIsSorted() ? 1 : 0.5,
                                                                transition: 'transform 0.2s ease', 
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            )}

                                        </div>
                                    )}
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
            {data.length > 0 &&
                <div className="flex justify-end items-baseline space-x-2 mt-2 flex-wrap gap-2">
                    <Text className="mb-2 md:mb-0">Rows per page</Text>
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
                </div>}
        </>
    );
};

export default CustomTable;
