import { toast } from 'react-toastify';

const toastSuccess = (message: string) => {
    toast.success(message, {
        position: 'bottom-right',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 3000,
    });
};

const toastError = (message: string) => {
    toast.error(message, {
        position: 'bottom-right',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 5000,
    });
};

export { toastSuccess, toastError };
