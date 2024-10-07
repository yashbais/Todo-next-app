import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import {CommonModalProps} from '../../types/types'


const CommonModal = ({ title, children, trigger }: CommonModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <div onClick={open}>
        {trigger} 
      </div>
    </>
  );
};

export default CommonModal;
