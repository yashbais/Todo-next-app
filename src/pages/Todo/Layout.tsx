import React from 'react';
import Header from '../../components/Header';
import ToDoList from '../../components/ToDoList';
import { Title } from '@mantine/core';
import CustomButton from '../../components/utils/CustomButton';

const Layout = () => {
    return (
        <div className='bg-[#f0f2f5] flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 xl:px-96'>
            <Header />

            <div className="flex  gap-5 flex-col-reverse sm:flex-row items-baseline justify-between w-full py-5">
                <Title order={1} className="text-xl md:text-2xl" lineClamp={2}>
                    Task List
                </Title>
                <CustomButton
                    variant="filled"
                    color="customPurple"
                    radius="md"
                    svgIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            width="16"
                            height="16"
                            fill="currentColor"
                        >
                            <path d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
                        </svg>
                    }
                >
                    Add Task
                </CustomButton>
            </div>

            <div className="flex flex-col w-full lg:px-0 py-5">
                <ToDoList />
            </div>
        </div>
    );
};

export default Layout;
