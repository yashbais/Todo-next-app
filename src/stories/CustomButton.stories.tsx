import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomButton from '../components/CustomButton';
import { IconPlus } from '@tabler/icons-react';
import { fn } from '@storybook/test';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' }, 
    svgIcon: { control: false }, 
    onClick: fn()
  },
};
export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {
  args: {
    children: 'Add task',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Add Item',
    svgIcon: <IconPlus size={16} />, 
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
