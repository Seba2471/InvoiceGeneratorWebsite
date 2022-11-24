import React, { createContext } from 'react';
import { Store } from '../store/auth/authReducer';
import { Action } from '../store/auth/actions';

type Context = {
  state: Store;
  dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<Context>({} as Context);
AuthContext.displayName = 'AuthContext';

export default AuthContext;
