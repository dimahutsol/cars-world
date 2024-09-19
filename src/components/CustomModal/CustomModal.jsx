import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../Icon/Icon';

import { closeModal } from '../../redux/modal/slice';
import { selectActiveModal } from '../../redux/modal/selector';
import s from './CustomModal.module.css';

Modal.setAppElement('#root');

const CustomModal = ({ children, type }) => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={activeModal === type}
      onRequestClose={handleCloseModal}
      className={s.modal}
      overlayClassName={s.modalOverlay}
    >
      <button className={s.iconButton} onClick={handleCloseModal}>
        <Icon name="icon-close" className={s.closeIcon} />
      </button>

      {children}
    </Modal>
  );
};

export default CustomModal;
