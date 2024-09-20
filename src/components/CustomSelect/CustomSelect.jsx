import Select from 'react-select';

import s from './CustomSelect.module.css';

const CustomSelect = ({
  options,
  onChange,
  defaultValue = null,
  placeholder,
}) => {
  return (
    <div className={s.wrapper}>
      <Select
        onChange={e => onChange(e)}
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={s.select}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CustomSelect;
