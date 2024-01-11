import { Toaster, toast } from 'react-hot-toast';

import { Toast } from '../components/Toast';

export interface IToast {
  message: string;
  type: 'success' | 'error';
  canRemove?: boolean;
  removeToast?: () => void;
}

export const useToaster = () => {
  const toastRemove = () => {
    toast.remove();
  };

  const toastTrigger = ({ message, type }: IToast) => {
    toast.custom(<Toast message={message} type={type} removeToast={toastRemove} />);
  };

  const ToastAnchor = <Toaster toastOptions={{ duration: 2000 }} containerStyle={{ top: 100, zIndex: 100000 }} />;

  return {
    ToastAnchor,
    toastTrigger,
    toastRemove,
  };
};
