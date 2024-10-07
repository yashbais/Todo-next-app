import { ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface CustomButtonProps extends ButtonProps {
  svgIcon?: ReactNode; // Optional prop for an SVG icon
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Ensure `onClick` is correctly typed
}

export interface Task {
  id: number;
  taskName: string;
}

export interface CommonModalProps {
  title: string;
  children: ReactNode;
  trigger: ReactNode; 
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
}

