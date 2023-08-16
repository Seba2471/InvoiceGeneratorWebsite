import * as yup from 'yup';

const authSchema = yup
  .object({
    email: yup
      .string()
      .email('Nieprawidłowy format adresu e-mail')
      .required('Adres e-mail jest wymagany'),
    password: yup
      .string()
      //   .min(8, 'Hasło musi mieć co najmniej 8 znaków')
      //   .matches(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      //     'Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę, jedną cyfrę i jeden znak specjalny',
      //   )
      .required('To pole jest wymagane'),
  })
  .required();

export default authSchema;
