"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementLocale, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51P7bNhLcyE8tQLhfW4dRsu8uvp3JK8wEduoNZ4nYsWrtwIFj59QLNlFBApsuQflCAfpUiLJ9KrIFrjRoj3iHSYOW00WFljuaW8");

export default function CheckoutWrapper() {

  const options: StripeElementsOptions = {
    locale: 'en' as StripeElementLocale,
  };


  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
};