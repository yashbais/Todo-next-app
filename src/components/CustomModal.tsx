import React from 'react';
import { Modal } from '@mantine/core';
import { CommonModalProps } from '../types/types'
import CustomButton from './CustomButton'

const CustomModal = ({ title, children, trigger, opened, setOpened }: CommonModalProps) => {

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title} centered>
        {children}
      </Modal>

      {trigger &&
        <CustomButton
          variant="filled"

          radius="md"
          onClick={() => setOpened(true)}
        >
          {trigger}
        </CustomButton>
      }
    </>
  );
};

export default CustomModal;
