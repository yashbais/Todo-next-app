import React, { useState } from 'react';
import { Title } from '@mantine/core';
import useStore from '../stores/useStore'; 
import CustomModal from './CustomModal';
import CustomButton from './CustomButton';
import UserRegistration from './UserRegistration';

const Header = () => {
  const { user, clearUser } = useStore();
  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    clearUser(); 
    setOpened(false);
  };

  const handleRegisterClick = () => {
    setOpened(true); 
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-300 to-purple-500 py-4 flex md:justify-evenly justify-between items-center px-4">
        <Title order={1} className="text-white">
          Tasks app
        </Title>
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4 md:block hidden">Welcome, {user.name}!</span>
            <CustomButton
              variant="outline"
              color="white"
              radius="md"
              onClick={handleLogout}
            >
              Logout
            </CustomButton>
          </div>
        ) : (
          <>
            <CustomButton
              variant="outline"
              color="white"
              radius="md"
              onClick={handleRegisterClick} 
            >
              Register
            </CustomButton>
            <CustomModal
              setOpened={setOpened}
              opened={opened}
              title="Register to todo app!"
            >
              <div className="flex justify-center item-center flex-col">
                <UserRegistration />
              </div>
            </CustomModal>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
