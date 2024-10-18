import { ButtonProps } from '@mantine/core';
import { ReactNode ,InputHTMLAttributes} from 'react';
import { UseFormRegister } from "react-hook-form";

export type childrenType = ReactNode;

export interface IFormProps<T> {
    defaultValues?: Partial<T>;
    children?: childrenType;
    buttonLabel?: string;
    onSubmit: (data: T) => void;
    handleSubmit: any
}
export interface CustomButtonProps extends ButtonProps {
  svgIcon?: ReactNode; // Optional prop for an SVG icon
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
  fetchTasks: () => Promise<void>; 
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