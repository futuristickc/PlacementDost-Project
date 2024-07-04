import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";


const stripePromise = loadStripe('pk_test_51PYTLRRtVfaYOTC1mCbViuijyY5EMfFeGaF4xylnVh4BTp3fTKzAmR7eKiSxmtXWULOFaRVtAzjXuIEDdl2NgrMA00PVvGCbTM');

const PaymentComponent = ({ cart }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { clearCart } = useContext(CartContext)
    const navigate = useNavigate();

    
    useEffect(() => {
    const fetchClientSecret = async () => {
        try {
        const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
            amount: calculateTotalAmount(cart)
        });
        // console.log('this is data from createPay function: ', data);
        // console.log("this is data.clientSecret from createPayIntent: ", data.clientSecret);
        setClientSecret(data.clientSecret);
        } catch (error) {
            setError('Failed to create payment intent');
        }
    };

    fetchClientSecret();
    }, [cart]);

    const calculateTotalAmount = (cart) => {
        return cart.reduce((total, product) => {
            return total + parseFloat(product.price.replace('$', ''));
        }, 0) * 100;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("this is event for pay: ", event);
        if(!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            console.log(result.error.message);
            setError(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment Succeeded');
                alert('Payment Succeeded');
                setSuccess('Payment Succeeded');
                setError('');
                clearCart();
                navigate('/cart');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || !clientSecret}>
                    Pay ${calculateTotalAmount(cart) / 100}
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{color: 'green' }}>{success}</div>}
        </div>
    );
};

const StripeWrapper = ({ cart }) => (
    <Elements stripe={stripePromise}>
        <PaymentComponent cart={cart} />
    </Elements>
);

export default StripeWrapper;