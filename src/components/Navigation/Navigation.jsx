import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import s from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.linkActive);
};

const Navigation = () => {
  return (
    <nav>
      <ul className={s.list}>
        <li className={s.listItem}>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink className={buildLinkClass} to="/catalog">
            Catalog
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink className={buildLinkClass} to="/favorites">
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
