import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';

import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.wrapper}>
          <NavLink className={s.logoBox} to="/">
            <Icon name="icon-car" className={s.logoIcon} />
            CarsWorld
          </NavLink>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
