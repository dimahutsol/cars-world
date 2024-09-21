import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomModal from '../CustomModal/CustomModal';
import CarsListItem from '../CarsListItem/CarsListItem';
import TagsList from '../TagsList/TagsList';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

import { openModal } from '../../redux/modal/slice';
import { selectIsLoading } from '../../redux/cars/selector';
import s from './CarsList.module.css';
import t from '../CarsListItem/CarsListItem.module.css';
import y from '../Button/Button.module.css';
import { NavLink } from 'react-router-dom';

const CarsList = ({ items, favoriteItems, alternative }) => {
  const [activeCar, setActiveCar] = useState(null);
  const [activeCarTags, setActiveCarTags] = useState([]);
  const [activeCarConditions, setActiveCarConditions] = useState([]);

  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const stub = alternative ? (
    <div className={s.stubBox}>
      <p className={s.text}>
        It seems that you have not yet added any car to your favorites.
      </p>
      <NavLink to="/catalog">
        <Button>Back to Catalog</Button>
      </NavLink>
    </div>
  ) : (
    <p className={s.text}>
      Sorry, there is nothing for this request, try changing the filters.
    </p>
  );

  const openActiveCarModal = (car, tags) => {
    setActiveCar(car);
    setActiveCarTags(tags);
    setActiveCarConditions([]);

    const carRentArr = car.rentalConditions.split('\n');
    const carMileage = (
      <p>
        Mileage:{' '}
        <span className={t.conditionsItemAccent}>
          {' '}
          {car.mileage.toLocaleString()}
        </span>
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

  return (
    <div>
      {items.length > 0 && (
        <ul className={s.list}>
          {items.map(car => (
            <li className={s.listItem} key={car.id}>
              <CarsListItem
                car={car}
                setActiveCar={tags => openActiveCarModal(car, tags)}
                isFavoriteCar={favoriteItems.some(item => item.id === car.id)}
              />
            </li>
          ))}
        </ul>
      )}

      {isLoading && <Loader small />}

      {items.length === 0 && !isLoading && stub}

      <CustomModal type={'carInfoModal'}>
        {activeCar && (
          <div className={t.wrapperOnModal}>
            <div className={t.imageBox}>
              <img
                className={t.imageOnModal}
                src={activeCar.img}
                alt={activeCar.make}
              />
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
