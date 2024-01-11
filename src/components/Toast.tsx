import { StyledToast } from '../styles/components/StyledToast';

import { CheckBrokenIcon, Plus, AlertIcon } from '../assets/svg';

export interface IToast {
  message: string;
  type: 'success' | 'error';
  canRemove?: boolean;
  removeToast?: () => void;
}

const getToastTypeIcon = (type: 'success' | 'error') => {
  switch (type) {
    case 'success':
      return <CheckBrokenIcon className={`${type}-icon`} />;
    case 'error':
      return <AlertIcon className={`${type}-icon`} />;
    default:
      return null;
  }
};

export const Toast = ({ message, type, removeToast = () => {}, canRemove = true }: IToast) => {
  return (
    <StyledToast className={type}>
      <div className="message-container">
        {getToastTypeIcon(type)}
        <span>{message}</span>
      </div>
      {canRemove && (
        <div className="close" onClick={removeToast}>
          <Plus />
        </div>
      )}
    </StyledToast>
  );
};
