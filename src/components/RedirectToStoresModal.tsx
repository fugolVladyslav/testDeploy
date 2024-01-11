import { useState } from 'react';
import { AndroidIcon, AppleIcon, Close, Copied, CopyIcon } from '../assets/svg';
import { Button } from './Button';

export interface Props {
  handleMobileStoresModalModal: () => void;
}

export const RedirectToStoresModal = ({ handleMobileStoresModalModal }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div>
      <button className="close-button" onClick={handleMobileStoresModalModal}>
        <Close />
      </button>
      <p>
        For the best event experience, we recommend using your desktop computer (PC/Laptop) or installing the NASO
        application on your mobile device to access and enjoy the event.
      </p>
      <Button
        flat
        textButton
        type="button"
        onClick={copyUrl}
        className={`text-button ${copied && 'text-copied'}`}
        leftIcon={!copied ? <CopyIcon /> : <Copied />}
      >
        {!copied ? 'Copy link to the event' : 'Copied!'}
      </Button>
      <Button
        onClick={() => window.open('https://apps.apple.com/us/app/naso/id1660766668', '_self')}
        transparent
        className="stores-btn"
        leftIcon={<AppleIcon />}
      >
        appstore
      </Button>
      <Button
        onClick={() => window.open('https://play.google.com/store/apps/details?id=com.naso.customer', '_self')}
        transparent
        className="stores-btn"
        leftIcon={<AndroidIcon />}
      >
        playmarket
      </Button>
    </div>
  );
};
