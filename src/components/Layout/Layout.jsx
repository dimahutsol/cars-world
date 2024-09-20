import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';
import Loader from '../Loader/Loader';

import s from './Layout.module.css';

const Layout = () => {
  return (
    <div className={s.layout}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
