import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import CarsList from '../../components/CarsList/CarsList';

import { fetchAllCarsThunk } from '../../redux/cars/operations';

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCarsThunk());
  }, [dispatch]);

  return (
    <div>
      <CarsList />
    </div>
  );
};

export default CatalogPage;
