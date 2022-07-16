import React, { useContext } from "react";
import MyButton from "../UI/button/MyButton";
import cl from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { SHOP_ROUTE, INFO_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, PERSONAL_PAGE_ROUTE, CHAT_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <div className={cl.navBar}>
      <div className={cl.navBar__main}>
        <div className={cl.navBar__main__logo}>
          <NavLink className={cl.navBar__main__logo__name} to={SHOP_ROUTE}>
            <div className={cl.navBar__main__logo__img}></div>
            <b>Rental</b>Service
          </NavLink>
        </div>
        <div>
          <NavLink className={cl.navBar__main__nav__info} to={INFO_ROUTE}>
            О сервисе
          </NavLink>
          {user.isAuth === true ? (
            <>
            {user.user.role === 'ADMIN'? <MyButton link={ADMIN_ROUTE}>Админ панель</MyButton>:<></>}
              
              <MyButton 
              link={PERSONAL_PAGE_ROUTE}
              >Профиль
              </MyButton>
              <MyButton 
              link={CHAT_ROUTE}
              >Мессенджер
              </MyButton>
              <MyButton
              onClick = {logOut}
              >Выйти</MyButton>
            </>
          ) : (
            <>
              <MyButton onClick={() => navigate(LOGIN_ROUTE)}>Войти</MyButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default NavBar;
