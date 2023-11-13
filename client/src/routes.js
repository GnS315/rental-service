import React from 'react';
import Admin from './pages/Admin/Admin';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';
import DevicePage from './pages/DevicePage/DevicePage';
import Info from './pages/Info/Info';
import PersonalPage from './pages/PersonalPage/PersonalPage';
import Shop from './pages/Shop/Shop';
import {
  ADMIN_ROUTE,
  CHAT_ROUTE,
  DEVICE_ROUTE,
  INFO_ROUTE,
  LOGIN_ROUTE,
  PERSONAL_PAGE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from './utils/consts';

export const authRoutes = [
  {
    path: PERSONAL_PAGE_ROUTE,
    Component: <PersonalPage />
  },
  {
    path: CHAT_ROUTE,
    Component: <Chat />
  }
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />
  }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: <Shop/>
  },
  {
    path: LOGIN_ROUTE,
    Component: <Auth />
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />
  },
  {
    path: `${DEVICE_ROUTE}/:id`,
    Component: <DevicePage />
  },
  {
    path: INFO_ROUTE,
    Component: <Info />
  }
];