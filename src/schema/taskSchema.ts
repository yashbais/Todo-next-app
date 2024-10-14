import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  taskName: Yup.string()
    .transform((value, originalValue) => originalValue.trim()) // Trim spaces
    .max(25, 'Must be at most 25 characters')
    .matches(/^[a-zA-Z][a-zA-Z\s]*$/, 'Insert only normal characters')
    .required('This field is required')
    .test('no-spaces-only', 'This field is required', (value) => value.trim() !== ''),
});

export default taskSchema;
