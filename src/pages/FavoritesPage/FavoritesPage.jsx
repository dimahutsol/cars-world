import { useSelector } from 'react-redux';

import Container from '../../components/Container/Container';
import CarsList from '../../components/CarsList/CarsList';

import { selectFavoriteCars } from '../../redux/cars/selector';
import s from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favoriteCars = useSelector(selectFavoriteCars);

  return (
    <Container>
      <div className={s.wrapper}>
        <CarsList items={favoriteCars} favoriteItems={favoriteCars} />
      </div>
    </Container>
  );
};

export default FavoritesPage;
