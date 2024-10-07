import { ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface CustomButtonProps extends ButtonProps {
  svgIcon?: React.ReactNode; // Optional prop for an SVG icon
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
