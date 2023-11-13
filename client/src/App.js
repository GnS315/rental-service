import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import './styles/App.css';
import {observer} from 'mobx-react-lite';
import {Context} from '.';
import {check} from './http/userApi';

const App = observer(() => {
  const {user} = useContext(Context);
  const [, setLoading] = useState(true);

  useEffect(() => {
    check().then((data) => {
      user.setUser(data);
      user.setIsAuth(true);
    })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
