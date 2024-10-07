import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CommonModalProps } from '../../types/types'


const CommonModal = ({ title, children, trigger }: CommonModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {/* Pass the close function as a prop */}
        {children}
        {/* {React.cloneElement(children as React.ReactElement, { close })} */}
      </Modal>

      <div onClick={open}>
        {trigger}
      </div>
    </>
  );
};

export default CommonModal;
