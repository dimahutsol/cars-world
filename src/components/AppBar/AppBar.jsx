import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header>
      <div className={s.wrapper}>
        <NavLink to="/">Logo</NavLink>
        <Navigation />
      </div>
    </header>
  );
};

export default AppBar;
