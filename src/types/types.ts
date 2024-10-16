import { ButtonProps } from '@mantine/core';
import { ReactNode ,InputHTMLAttributes} from 'react';
import { UseFormRegister } from "react-hook-form";
import {  ColumnDef,SortingState} from '@tanstack/react-table';

export type childrenType = ReactNode;

export interface IFormProps<T> {
    defaultValues?: Partial<T>;
    children?: childrenType;
    buttonLabel?: string;
    onSubmit: (data: T) => void;
    handleSubmit: any
}
export interface CustomButtonProps extends ButtonProps {
  svgIcon?: ReactNode; 
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface Task {
  id: number;
  taskName: string;
}

export interface CommonModalProps {
  title: string;
  children: ReactNode;
  trigger?: ReactNode; 
  opened : boolean;
  setOpened: (value: React.SetStateAction<boolean>) => void; 
}

export interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  name: string;
  error?: string; 
}

export interface TodoListProps {
  tasks: Task[];
  fetchTasks: () => void; 
  totalPages:number;
  page:number;
  setPage: (page: number) => void;
  limit:number;
  setLimit: (limit: number) => void; 
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  }

export interface TaskName {
  taskName: string; 
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string;
  error?: string;
  register: UseFormRegister<any>;
}

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

export interface AllTasks {
  page: number;
  limit: number;
  sorting?: SortingState;
}

export interface CustomTableProps {
  totalPages: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    sorting: SortingState;
    setSorting: (sorting: SortingState) => void;
}

export interface NewComponentProps   {
  fetchTasks: () => void;
  setOpened: (value: React.SetStateAction<boolean>) => void; 
}

export interface User {
  name: string; 
  email: string; 
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (user: Partial<User>) => void;
}