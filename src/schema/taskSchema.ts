import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  taskName: Yup.string()
    .transform((value, originalValue) => originalValue.trim()) 
    .max(25, 'Must be at most 25 characters')
    .matches(/^[a-zA-Z0-9\s]*$/, 'Insert only letters, numbers, and spaces')
    .required('This field is required')
    .test('no-spaces-only', 'This field is required', (value) => value.trim() !== ''),
});

export default taskSchema;





