import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  taskName: Yup.string()
  .max(25, 'Must be exactly 25 characters')
  .matches(/^[a-zA-Z][a-zA-Z\s]*$/, 'Insert only normal characters')
  .transform((value, originalValue) => (originalValue === '' ? undefined : value))
  .required('This field is required'),
});

export default taskSchema;