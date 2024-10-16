import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value, originalValue) => originalValue.trim())
    .max(50, 'Name must be at most 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .required('Name is required')
    .test('no-spaces-only', 'Name cannot be just spaces', (value) => value.trim() !== ''),
  
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|info|co|io|xyz)$/,
      'Must be a valid email with .com, .org, or other specified domains'
    )
});

export default userSchema;
