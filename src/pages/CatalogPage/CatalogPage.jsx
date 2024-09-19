import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from '../../components/Container/Container';
import CarsList from '../../components/CarsList/CarsList';

import { fetchAllCarsThunk } from '../../redux/cars/operations';

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCarsThunk({ page: 1, limit: 12 }));
  }, [dispatch]);

  return (
    <Container>
      <CarsList />
    </Container>
  );
};

export default CatalogPage;
