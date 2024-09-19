import Select from 'react-select';

import s from './CustomSelect.module.css';

const CustomSelect = ({ options, onChange }) => {
  return (
    <div className={s.wrapper}>
      <Select onChange={e => onChange(e)} options={options} />
    </div>
  );
};

export default CustomSelect;
