import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  taskName: Yup.string()
    .required('Task name is required')
    .trim() 
    .matches(/^(?! )[^\s].*[^ ]$/, 'Task name cannot start or end with a space')
    .max(100, 'Task name must be at most 100 characters long'),
});

export default taskSchema;
