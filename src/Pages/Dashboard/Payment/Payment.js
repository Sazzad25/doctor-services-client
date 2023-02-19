import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../../Shared/Loading/Loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();
    const {treatment, price, appointmentDate, slot} = booking;
    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
 
    return (
        <div>
            <h4 className='text-3xl'>Payment for {treatment}</h4>
            <p className='text-xl'>Please pay <strong>${price}</strong> for your appointment on {appointmentDate} st {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;