import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { StripeIcon } from '../../assets/svg';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      navigate('/success');

      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>payment details</h1>
      <div className="stripe-form">
        <PaymentElement />
      </div>
      <Button disabled={!stripe} className="submit-button-modal">
        Submit
      </Button>
      <div className="stripe-links">
        <StripeIcon />
        <div>
          <a
            href="https://stripe.com/legal/consumer
"
            target="_blanc"
          >
            Terms
          </a>
          <a href="https://stripe.com/privacy" target="_blanc">
            Privacy
          </a>
        </div>
      </div>
    </form>
  );
}
