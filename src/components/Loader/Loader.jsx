import { RotatingLines } from 'react-loader-spinner';
import clsx from 'clsx';

import s from './Loader.module.css';

const Loader = ({ small = false, height = 120, width = 120 }) => {
  return (
    <div className={clsx(small ? s.wrapperSmall : s.wrapper)}>
      <div className={s.loader}>
        <RotatingLines
          visible={true}
          height={height}
          width={width}
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </div>
  );
};

export default Loader;
