import { ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

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
  trigger: ReactNode; 
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
  setTasks: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>; 
}


export interface TaskName {
  taskName: string; 
}