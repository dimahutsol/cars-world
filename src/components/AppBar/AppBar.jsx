import { NavLink } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';

import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.wrapper}>
          <NavLink className={s.logoBox} to="/">
            <FaCar className={s.logoIcon} />
            CarsWorld
          </NavLink>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
