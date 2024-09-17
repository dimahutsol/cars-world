import s from './CarsListItem.module.css';

const CarsListItem = ({ car }) => {
  console.log('listItem: ', car);
  const tags = [...car.accessories, ...car.functionalities];

  return (
    <div className={s.wrapper}>
      <img className={s.image} src={car.img} alt={car.make} />
      <div className={s.info}>
        <p className={s.name}>
          {car.make} <span>{car.model ?? ''}, </span>
          {car.year}
        </p>
        <p className={s.price}>{car.rentalPrice}</p>
      </div>
      <ul className={s.tagsList}>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <button>Learn More</button>
    </div>
  );
};

export default CarsListItem;
