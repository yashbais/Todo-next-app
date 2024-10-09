import React from 'react';
import { Modal } from '@mantine/core';
import { CommonModalProps } from '../types/types'


const CommonModal = ({ title, children, trigger,opened,setOpened }: CommonModalProps) => {

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title} centered>
        {/* Pass the close function as a prop */}
        {children}
        {/* {React.cloneElement(children as React.ReactElement, { close })} */}
      </Modal>

      <div onClick={() => setOpened(true)}>
        {trigger}
      </div>
    </>
  );
};

export default CommonModal;
