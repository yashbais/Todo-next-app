// src/components/Header.tsx
import React from 'react';
import { Box, Title, Container } from '@mantine/core';


const Header = () => {

  return (
    <>
      <header className="py-4 shadow-md">

        <Container>
          <Box maw={600} mx="auto" className="text-center">
            <Title order={1} className=" text-xl md:text-3xl font-bold" lineClamp={2}>
              Todo App
            </Title>
            <p className=" mt-2 text-lg md:text-xl">
              Manage your tasks efficiently and effectively.
            </p>
          </Box>
        </Container>
      </header>
    </>
  );
};

export default Header;
