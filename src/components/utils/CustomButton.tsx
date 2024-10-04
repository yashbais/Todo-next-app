import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import { CustomButtonProps } from '../../types/types'; // Import the interface

const CustomButton: React.FC<CustomButtonProps> = ({ children, svgIcon, ...props }) => {
  return (
    <MantineButton {...props}>
      <div className="flex items-center justify-between gap-2">
        {svgIcon && svgIcon}
        {children}
      </div>
    </MantineButton>
  );
};

export default CustomButton;
