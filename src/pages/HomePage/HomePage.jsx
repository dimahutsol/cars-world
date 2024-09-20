import { NavLink } from 'react-router-dom';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.middleBox}>
        <h1 className={s.title}>Welcome!</h1>
        <p className={s.subtitle}>Find the best car for you.</p>
        <NavLink to="/catalog" className={s.button}>
          Let&apos;s Go
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
