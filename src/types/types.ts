import { ButtonProps } from '@mantine/core';

export interface CustomButtonProps extends ButtonProps {
  svgIcon?: React.ReactNode; // Optional prop for an SVG icon
}