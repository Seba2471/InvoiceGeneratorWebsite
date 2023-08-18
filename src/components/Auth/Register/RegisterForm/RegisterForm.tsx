import { useNavigate } from 'react-router-dom';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback/ErrorFeedback';
import Title from '../../Shared/Title/Title';
import AuthInput from '../../../UI/Form/AuthInput/AuthInput';
import ButtonWithSpinner from '../../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import Button from '../../../UI/Buttons/Button/Button';
import './RegisterForm.scss';
import Underline from '../../Shared/Underline/Underline';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUiIsLoading } from '../../../../data/ui/ui';
import { authActions, getAuthErrorSelector } from '../../../../data/auth/auth';
import { useForm, Controller } from 'react-hook-form';
import { IAuthRegisterRequest } from '../../../../models/Auth/IAuthRegisterRequest';
import validation from '../../../../validation/Auth/AuthRegisterValidation';
import { yupResolver } from '@hookform/resolvers/yup';

export default function RegisterForm(props: { onRegister: Function }) {
  const navigate = useNavigate();
  const loading = useSelector(getUiIsLoading);
  const registerError = useSelector(getAuthErrorSelector);
  const dispatch = useDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRegisterRequest>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit(async (data) => await login(data));

  const login = async (data: IAuthRegisterRequest) => {
    dispatch(authActions.register(data));
    reset();
  };

  return (
    <div className="register-form">
      <Title title="Rejestracja" />
      <form className="register-form__form" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              placeHolder={'Email'}
              type="email"
              value={value}
              onChange={(val: string) => onChange(val)}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              placeHolder={'Hasło'}
              type={'password'}
              value={value}
              onChange={(val: string) => onChange(val)}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              placeHolder={'Powtórz hasło'}
              type={'password'}
              value={value}
              onChange={(val: string) => onChange(val)}
              error={errors.confirmPassword?.message}
            />
          )}
        />
        <ErrorFeedback error={registerError} />
        <ButtonWithSpinner
          value="Zarejestruj się"
          loading={loading}
          action={() => null}
        />
      </form>
      <Underline />
      <p className="register-form__login-text">Masz już konto ? </p>
      <Button value="Zaloguj się" action={() => navigate('/login')} />
    </div>
  );
}
