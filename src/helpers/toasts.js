import toast from 'react-hot-toast';

export const toastSuccess = (text = 'Success!') =>
  toast.success(text, {
    position: 'bottom-center',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

export const toastError = (text = 'Something went wrong...') =>
  toast.error(text, {
    position: 'bottom-center',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
