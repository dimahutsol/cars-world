import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomModal from '../CustomModal/CustomModal';
import CarsListItem from '../CarsListItem/CarsListItem';
import TagsList from '../TagsList/TagsList';
import Icon from '../Icon/Icon';
import CustomSelect from '../CustomSelect/CustomSelect';

import {
  selectCars,
  selectFavoriteCars,
  selectFilter,
  selectPage,
  selectTotal,
} from '../../redux/cars/selector';
import { openModal } from '../../redux/modal/slice';
import { fetchAllCarsThunk } from '../../redux/cars/operations';
import makes from '../../helpers/data.json';
import s from './CarsList.module.css';
import t from '../CarsListItem/CarsListItem.module.css';
import y from '../Button/Button.module.css';
import { setFilter } from '../../redux/cars/slice';

const CarsList = () => {
  const [activeCar, setActiveCar] = useState(null);
  const [activeCarTags, setActiveCarTags] = useState([]);
  const [activeCarConditions, setActiveCarConditions] = useState([]);
  const [carsToShow, setCarsToShow] = useState([]);

  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const favoriteCars = useSelector(selectFavoriteCars);
  const filter = useSelector(selectFilter);
  const page = useSelector(selectPage);
  const total = useSelector(selectTotal);

  const makesOptions = makes.map(item => ({
    value: item.toLowerCase(),
    label: item,
  }));

  const handleSelectChange = e => {
    dispatch(setFilter(e.value));
  };

  const handleLoadMore = () => {
    dispatch(fetchAllCarsThunk({ page, limit: 12 }));
  };

  const openActiveCarModal = (car, tags) => {
    setActiveCar(car);
    setActiveCarTags(tags);
    setActiveCarConditions([]);

    const carRentArr = car.rentalConditions.split('\n');
    const carMileage = (
      <p>
        Mileage: <span className={t.conditionsItemAccent}> {car.mileage}</span>
      </p>
    );
    const carPrice = (
      <p>
        Price:{' '}
        <span className={t.conditionsItemAccent}>
          {car.rentalPrice.replace('$', '')}$
        </span>
      </p>
    );
    const conditions = [...carRentArr, carMileage, carPrice];
    setActiveCarConditions(conditions);
    dispatch(openModal('carInfoModal'));
  };

  useEffect(() => {
    if (filter === '') {
      setCarsToShow(cars);
      return;
    }
    const actualCars = cars.filter(
      car => car.make.toLowerCase() === filter.toLowerCase()
    );
    setCarsToShow(actualCars);
  }, [cars, filter]);

  return (
    <div>
      <CustomSelect options={makesOptions} onChange={handleSelectChange} />
      <ul className={s.list}>
        {carsToShow.map(car => (
          <li className={s.listItem} key={car.id}>
            <CarsListItem
              car={car}
              setActiveCar={tags => openActiveCarModal(car, tags)}
              isFavoriteCar={favoriteCars.includes(car.id)}
            />
          </li>
        ))}
      </ul>
      {cars.length < total && (
        <div className={s.loadMoreBox}>
          <button onClick={handleLoadMore}>Load more</button>
        </div>
      )}

      <CustomModal type={'carInfoModal'}>
        {activeCar && (
          <div className={t.wrapperOnModal}>
            <div className={t.imageBox}>
              <img
                className={t.imageOnModal}
                src={activeCar.img}
                alt={activeCar.make}
              />
              <Icon name={'icon-heart'} className={t.icon} />
            </div>
            <div className={t.info}>
              <p className={t.nameOnModal}>
                {activeCar.make}{' '}
                <span className={t.nameAccent}>{activeCar.model ?? ''}, </span>
                {activeCar.year}
              </p>
              <p className={t.price}>{activeCar.rentalPrice}</p>
            </div>
            <div className={t.tagsListBoxInModal}>
              <TagsList tags={activeCarTags} />
            </div>
            <p className={t.description}>{activeCar.description}</p>
            <h3 className={t.subtitle}>Accessories and functionalities:</h3>
            <div className={t.functionsBox}>
              <TagsList tags={activeCar.accessories} />
              <TagsList tags={activeCar.functionalities} />
            </div>
            <h3 className={t.subtitle}>Rental Conditions:</h3>
            <ul className={t.conditionsList}>
              {activeCarConditions.map((item, index) => (
                <li className={t.conditionsItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={t.buttonBoxOnModal}>
              <a className={y.button} href="tel:+380730000000">
                Rental Car
              </a>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default CarsList;
