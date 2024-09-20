import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import TagsList from '../TagsList/TagsList';

import { toggleFavoriteCar } from '../../redux/cars/slice';
import s from './CarsListItem.module.css';

const CarsListItem = ({
  car: {
    id,
    make,
    model,
    mileage,
    year,
    type,
    img,
    rentalCompany,
    rentalPrice,
    rentalConditions,
    functionalities,
    address,
  },
  setActiveCar,
  isFavoriteCar,
}) => {
  const dispatch = useDispatch();

  const addressArr = address.split(',');
  const tags = [
    addressArr[addressArr.length - 2],
    addressArr[addressArr.length - 1],
    rentalCompany,
    type,
    model,
    mileage,
    functionalities[0],
  ];

  const handleButtonClick = () => {
    setActiveCar(tags);
  };

  const handleLikeClick = () => {
    dispatch(
      toggleFavoriteCar({
        id,
        make,
        model,
        mileage,
        year,
        type,
        img,
        rentalCompany,
        rentalPrice,
        rentalConditions,
        functionalities,
        address,
      })
    );
  };

  return (
    <div className={s.wrapper}>
      <div className={s.imageBox}>
        <img className={s.image} src={img} alt={make} />
        <Icon
          onClick={handleLikeClick}
          name="icon-heart"
          height="24"
          width="24"
          className={clsx(s.icon, isFavoriteCar && s.iconActive)}
        />
      </div>
      <div className={s.info}>
        <p className={s.name}>
          {make} <span className={s.nameAccent}>{model ?? ''}, </span>
          {year}
        </p>
        <p className={s.price}>{rentalPrice}</p>
      </div>
      <div className={s.tagsListBox}>
        <TagsList tags={tags} />
      </div>
      <Button onClick={handleButtonClick}>Learn More</Button>
    </div>
  );
};

export default CarsListItem;
