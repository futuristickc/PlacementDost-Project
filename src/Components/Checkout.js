import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import StripeWrapper from "./PaymentComponent";

function Checkout() {
    const { cart } = useContext(CartContext);

    return (
        <div>
            <h2>Checkout</h2>
            <StripeWrapper cart={cart} />
        </div>
    );
};

export default Checkout;