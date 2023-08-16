import LoginInput from '../../../UI/Form/AuthInput/AuthInput';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback/ErrorFeedback';
import { useNavigate } from 'react-router-dom';
import Underline from '../../Shared/Underline/Underline';
import './LoginForm.scss';
import ButtonWithSpinner from '../../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import Button from '../../../UI/Buttons/Button/Button';
import Title from '../../Shared/Title/Title';
import { getUiIsLoading } from '../../../../data/ui/ui';
import { useSelector } from 'react-redux';
import { authActions, getAuthErrorSelector } from '../../../../data/auth/auth';
import { IAuthRequest } from '../../../../models/Auth/IAuthRequest';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validation from '../../../../validation/Auth/AuthValidation';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const navigate = useNavigate();
  const loading = useSelector(getUiIsLoading);
  const error = useSelector(getAuthErrorSelector);
  const dispatch = useDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit(async (data) => await generateInvoice(data));

  const generateInvoice = async (data: IAuthRequest) => {
    dispatch(authActions.login(data));
    reset();
  };

  return (
    <div className="login-form">
      <Title title="Logowanie" />
      <form className="login-form__form" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <LoginInput
              className="login-form__input-group"
              inputClassName="login-form__input"
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
            <LoginInput
              className="login-form__input-group"
              inputClassName="login-form__input"
              placeHolder={'Hasło'}
              type="password"
              value={value}
              onChange={(val: string) => onChange(val)}
              error={errors.password?.message}
            />
          )}
        />
        <ErrorFeedback error={error} />
        <a
          className="login-form__link login-form__restart-password-link"
          href="/password_restart"
        >
          Nie pamiętasz hasła?
        </a>
        <ButtonWithSpinner
          value="Zaloguj"
          loading={loading}
          action={() => null}
        />
      </form>
      <Underline />
      <p className="login-form__register-text">Nie masz jeszcze konta ?</p>
      <Button value="Zarejestruj się" action={() => navigate('/register')} />
    </div>
  );
}
