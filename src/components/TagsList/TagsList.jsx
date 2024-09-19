import s from './TagsList.module.css';

const TagsList = ({ tags }) => {
  return (
    <ul className={s.tagsList}>
      {tags.map((tag, index) => (
        <li className={s.tagListItem} key={index}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
