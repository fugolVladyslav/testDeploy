import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripeKey: string = import.meta.env.VITE_REACT_APP_STRIPE_KEY;

const stripePromise = loadStripe(stripeKey);
export default function StripeWrapper({ stripeData }: any) {
  const options = {
    clientSecret: stripeData?.data?.paymentIntent,
    appearance: {
      theme: 'night',
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
