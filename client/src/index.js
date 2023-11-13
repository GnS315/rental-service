import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChatStore from './store/ChatStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    chat: new ChatStore()
  }} >
    <App />
  </Context.Provider>
);

