import Underline from '../Underline/Underline';
import avatar from '../../../assets/images/avatar.svg';
import './Title.scss';

export default function Title(props: { title: string }) {
  const getFormatedTitle = () => {
    const firstSpace = props.title.search(' ');
    const firstWord = props.title.substring(0, firstSpace);
    const otherTitle = props.title.substring(firstSpace, props.title.length);
    return (
      <h2 className="auth-title__title">
        <span> {firstWord}</span> {otherTitle}
      </h2>
    );
  };
  return (
    <div className="auth-title">
      <img className="auth-title__avatar" src={avatar} alt="avatar" />
      {getFormatedTitle()}
      <Underline />
    </div>
  );
}
