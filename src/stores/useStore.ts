import {create} from 'zustand';
import { userSlice } from '../slices/userSlice';

const useStore = create(userSlice);

export default useStore;