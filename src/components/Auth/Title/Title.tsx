import Underline from '../Underline/Underline';
import avatar from '../../../assets/images/avatar.svg';
import './Title.scss';

export default function Title(props: { title: string }) {
  return (
    <div className="auth-title">
      <img className="auth-title__avatar" src={avatar} alt="avatar" />
      <h2 className="auth-title__title">{props.title}</h2>
      <Underline />
    </div>
  );
}
