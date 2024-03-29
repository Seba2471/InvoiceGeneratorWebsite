import { IAuthRegisterRequest } from './../../models/Auth/IAuthRegisterRequest';
import * as yup from 'yup';
import authSchema from './AuthValidation';

const authRegisterSchema = yup.object({
  ...authSchema.fields,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Hasła muszą się zgadzać')
    .required('To pole jest wymagane'),
}) as yup.ObjectSchema<IAuthRegisterRequest>;

export default authRegisterSchema;
