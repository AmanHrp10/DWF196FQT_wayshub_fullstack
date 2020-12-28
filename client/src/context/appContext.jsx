import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isLoading: true,
  users: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            channelName: action.payload.channelName,
          })
        ),
        token: localStorage.setItem('token', action.payload.token),
      };

    case 'CHANNEL_LOADED':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            channelName: action.payload.channelName,
          })
        ),
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        token: localStorage.removeItem('token'),
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
