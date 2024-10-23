import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomButton from '../components/CustomButton';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    svgIcon: {
      options: ['plus', 'minus'],
      mapping: {
           plus: <IconPlus size={16} />,
        minus: <IconMinus size={16} />,
      },
      defaultValue: 'plus',
    },
    onClick: { action: 'clicked' },
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
  render: (args) => {
    const { svgIcon, ...rest } = args;
    const icon = args.svgIcon;

    return (
      <CustomButton {...rest} svgIcon={icon}>
        {args.children}
      </CustomButton>
    );
  },
};
