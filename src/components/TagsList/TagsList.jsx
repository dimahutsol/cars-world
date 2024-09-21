import s from './TagsList.module.css';

const TagsList = ({ tags = [] }) => {
  return (
    <ul className={s.tagsList}>
      {tags.map((tag, index) => (
        <li className={s.tagListItem} key={index}>
          {typeof tag === 'number' ? tag.toLocaleString() : tag}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
