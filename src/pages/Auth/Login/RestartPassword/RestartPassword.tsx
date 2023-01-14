import React from 'react';
import Auth from '../../../../components/Auth/Auth';
import RestartPasswordForm from '../../../../components/Auth/Login/RestartPassword/RestartPasswordForm';

export default function RestartPassword() {
  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const restartPassword = async () => {
    //Mock backend
    await timeout(2000);
    console.log('Password has been restarted');
    return false;
  };

  const content = <RestartPasswordForm onRestart={restartPassword} />;

  return <Auth content={content} />;
}
