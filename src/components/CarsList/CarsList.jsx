import { useSelector } from 'react-redux';

import CarsListItem from '../CarsListItem/CarsListItem';

import { selectCars } from '../../redux/cars/selector';
import s from './CarsList.module.css';

const CarsList = () => {
  const cars = useSelector(selectCars);
  console.log('cars:::::', cars);

  return (
    <div>
      <ul className={s.list}>
        {cars.map(car => (
          <li key={car.id}>
            <CarsListItem car={car} />
          </li>
        ))}
      </ul>
      <button className={s.button}>Load more</button>
    </div>
  );
};

export default CarsList;
