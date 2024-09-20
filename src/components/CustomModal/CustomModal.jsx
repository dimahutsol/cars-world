import Modal from 'react-modal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgClose } from 'react-icons/cg';

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

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'auto';
  }, [activeModal]);

  return (
    <Modal
      isOpen={activeModal === type}
      onRequestClose={handleCloseModal}
      className={s.modal}
      overlayClassName={s.modalOverlay}
    >
      <button className={s.iconButton} onClick={handleCloseModal}>
        <CgClose className={s.closeIcon} />
      </button>

      {children}
    </Modal>
  );
};

export default CustomModal;
