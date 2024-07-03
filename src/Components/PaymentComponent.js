import React, { useState } from "react";
import axios from axios;
import { loadStripe } from '@strip/strip-js';
import { Card } from "react-bootstrap";

const stripePromise = loadStripe('pk_test_51PYTLRRtVfaYOTC1mCbViuijyY5EMfFeGaF4xylnVh4BTp3fTKzAmR7eKiSxmtXWULOFaRVtAzjXuIEDdl2NgrMA00PVvGCbTM');

const PaymentComponent = () => {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const createPaymentIntent = async () => {
        const { data } = await axios.post('api/payment/create-payment-intent', { amount: 1000 });
        setClientSecret(data.clientSecret);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements) {
            return;
        }

        const result = await stripe.confimCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment Succeeded');
            }
        }
    };

    return (
        <div>
            <button onClick={createPaymentIntent}>Pay $10</button>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

const StripeWrapper = () => {
    <Elements stripe={stripePromise}>
        <PaymentComponent />
    </Elements>
};

export default StripeWrapper;