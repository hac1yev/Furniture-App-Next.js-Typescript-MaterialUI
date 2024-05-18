"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementLocale, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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