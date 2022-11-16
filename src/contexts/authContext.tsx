import React, { createContext } from 'react';
import { Store } from '../reducers/auth/authReducer';
import { Action } from '../reducers/auth/actions';

type Context = {
  state: Store;
  dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<Context>({} as Context);
AuthContext.displayName = 'AuthContext';

export default AuthContext;
