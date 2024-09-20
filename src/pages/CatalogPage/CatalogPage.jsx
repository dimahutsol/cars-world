import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Container from '../../components/Container/Container';
import CarsList from '../../components/CarsList/CarsList';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import Button from '../../components/Button/Button';

import { fetchAllCarsThunk } from '../../redux/cars/operations';
import {
  selectCars,
  selectFavoriteCars,
  selectFilter,
  selectFilterMileageFrom,
  selectFilterMileageTo,
  selectFilterRentalPrice,
  selectIsLoading,
  selectMaxCarsRentalPrice,
  selectPage,
  selectTotal,
} from '../../redux/cars/selector';
import {
  setFilter,
  setFilterMileageFrom,
  setFilterMileageTo,
  setFilterRentalPrice,
} from '../../redux/cars/slice';
import makes from '../../helpers/data.json';
import s from './CatalogPage.module.css';

const CatalogPage = () => {
  const [carsToShow, setCarsToShow] = useState([]);

  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const favoriteCars = useSelector(selectFavoriteCars);
  const filter = useSelector(selectFilter);
  const filterRentalPrice = useSelector(selectFilterRentalPrice);
  const filterMileageFrom = useSelector(selectFilterMileageFrom);
  const filterMileageTo = useSelector(selectFilterMileageTo);
  const maxCarsRentalPrice = useSelector(selectMaxCarsRentalPrice);
  const page = useSelector(selectPage);
  const total = useSelector(selectTotal);
  const isLoading = useSelector(selectIsLoading);

  const makesOptions = useMemo(() => {
    const values = makes.map(item => ({
      value: item.toLowerCase(),
      label: item,
    }));
    return values;
  }, []);

  const priceOptions = useMemo(() => {
    const step = 10;
    const initialPriceOptions = [
      {
        value: '0',
        label: 'All',
      },
    ];

    for (let i = step; i <= maxCarsRentalPrice; i += step) {
      initialPriceOptions.push({
        value: i.toString(),
        label: `$${i}`,
      });
    }

    if (maxCarsRentalPrice % step !== 0) {
      initialPriceOptions.push({
        value: maxCarsRentalPrice.toString(),
        label: `$${maxCarsRentalPrice}`,
      });
    }

    return initialPriceOptions;
  }, [maxCarsRentalPrice]);

  const handleMakeSelectChange = e => {
    dispatch(setFilter(e));
  };

  const handlePriceSelectChange = e => {
    dispatch(setFilterRentalPrice(e));
  };

  const handleSearchButton = () => {
    if (
      filter === '' &&
      maxCarsRentalPrice === 0 &&
      filterMileageFrom === null &&
      filterMileageTo === null
    ) {
      setCarsToShow(cars);
      return;
    }
    const actualCars = cars
      .filter(car => {
        if (filter === '') {
          return true;
        }
        return car.make.toLowerCase() === filter.value.toLowerCase();
      })
      .filter(car => {
        const rentalPrice = parseFloat(car.rentalPrice.replace('$', ''));

        if (filterRentalPrice?.value == 0 || filterRentalPrice === null) {
          return true;
        }

        return rentalPrice <= filterRentalPrice.value;
      })
      .filter(car => {
        if (filterMileageFrom === null && filterMileageTo === null) {
          return true;
        }

        const isMileageFromValid = filterMileageFrom
          ? car.mileage >= filterMileageFrom
          : true;
        const isMileageToValid = filterMileageTo
          ? car.mileage <= filterMileageTo
          : true;

        return isMileageFromValid && isMileageToValid;
      });

    setCarsToShow(actualCars);
  };

  const handleMileageFromInputChange = e => {
    dispatch(setFilterMileageFrom(e.target.value));
  };

  const handleMileageToInputChange = e => {
    dispatch(setFilterMileageTo(e.target.value));
  };

  const handleLoadMore = () => {
    dispatch(fetchAllCarsThunk({ page, limit: 12 }));
  };

  useEffect(() => {
    setCarsToShow(cars);

    if (cars.length === 0) {
      dispatch(fetchAllCarsThunk({ page: 1, limit: 12 }));
    }
  }, [dispatch, cars]);

  return (
    <Container>
      <div className={s.filtersBox}>
        <div className={s.selectMakesBox}>
          <p className={s.selectTitle}>Car brand</p>
          <CustomSelect
            options={makesOptions}
            onChange={handleMakeSelectChange}
            defaultValue={filter || null}
            placeholder={'Enter the text'}
          />
        </div>
        <div className={s.selectPriceBox}>
          <p className={s.selectTitle}>Price/ 1 hour</p>
          <CustomSelect
            options={priceOptions}
            onChange={handlePriceSelectChange}
            defaultValue={filterRentalPrice || null}
            placeholder={'To $'}
          />
        </div>
        <div className={s.inputsWrapper}>
          <p className={s.selectTitle}>Сar mileage / km</p>
          <div className={s.inputsBox}>
            <input
              className={clsx(s.input, s.inputLeft)}
              type="number"
              onChange={handleMileageFromInputChange}
              placeholder="From"
            />
            <input
              className={clsx(s.input, s.inputRight)}
              type="number"
              onChange={handleMileageToInputChange}
              placeholder="To"
            />
          </div>
        </div>
        <div className={s.buttonBox}>
          <Button onClick={handleSearchButton}>Search</Button>
        </div>
      </div>
      <CarsList items={carsToShow} favoriteItems={favoriteCars} />
      {cars.length < total && !isLoading && carsToShow.length > 0 && (
        <div className={s.loadMoreBox}>
          <button onClick={handleLoadMore}>Load more</button>
        </div>
      )}
    </Container>
  );
};

export default CatalogPage;
