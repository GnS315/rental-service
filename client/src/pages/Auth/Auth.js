import React, {useContext} from 'react';
import cl from './Auth.module.css';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {auth, registration} from '../../http/userApi';
import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../..';

const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const click = async() => {
    try {
      let data;

      if (isLogin) {
        data = await auth(login, password);
      } else {
        data = await registration(login, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch(e) {
      alert(e.response.data.message);
    }

  };

  return (
    <div className={cl.authMain}>
      <div className={cl.authMain__content}>
        <h2
          className={cl.authMain__content__header}
        >{isLogin ? 'Авторизация' : 'Регистрация' }</h2>
        <div className={cl.authMain__content__reg}>
          <input
            placeholder='Логин'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className={cl.authMain__content__reg__input}
          />
          <input
            placeholder='Пароль'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            className={cl.authMain__content__reg__input}
          />
          {isLogin ?
            <div className={cl.authMain__content__reg__footer}>
              <div>
                                Нет аккаунта? {' '}
                <NavLink className={cl.authMain__content__reg__footer__nav} to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
              </div>
              <button
                className={cl.authMain__content__reg__footer__btn}
                onClick={click}
              >Войти</button>
            </div> :
            <div className={cl.authMain__content__reg__footer}>
              <div>
                                Есть аккаунт? {' '}
                <NavLink className={cl.authMain__content__reg__footer__nav} to={LOGIN_ROUTE}>Войди</NavLink>
              </div>
              <button
                className={cl.authMain__content__reg__footer__btn}
                onClick={click}
              >Зарегистрироваться</button>
            </div>
          }

        </div>
      </div>
    </div>
  );
});

export default Auth;