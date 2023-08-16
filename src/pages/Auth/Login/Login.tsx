import LoginForm from '../../../components/Auth/Login/LoginForm/LoginForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';

export default function Login() {
  const content = <LoginForm />;

  return <Auth content={content} />;
}
