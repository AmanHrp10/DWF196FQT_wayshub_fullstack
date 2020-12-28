import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  Users: [],
  isLoading: true,
  channel: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        channel: {
          id: action.payload.id,
          channelName: action.payload.channelName,
          photo: action.payload.photo,
          thumbnail: action.payload.thumbnail,
          description: action.payload.description,
          videos: action.payload.videos,
        },
      };

    case 'CHANNEL_LOADED':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        channel: {
          id: action.payload.id,
          channelName: action.payload.channelName,
          photo: action.payload.photo,
          thumbnail: action.payload.thumbnail,
          description: action.payload.description,
          videos: action.payload.videos,
        },
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isLogin: false,
        isLoading: false,
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
