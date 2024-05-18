import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51P7bNhLcyE8tQLhf4esF0hqmIYwRNF046oXEXIMDsjkeVXuPZHkHkcdSWXjxG2TWto7qYBMFQjUrv1aMv8iCIOv5000zSwPAZl");

export async function POST(req: NextRequest) {
  const  data  = await req.json();
  const { amount } = data;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });        

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    console.error("Error creating payment intent:", error.message);
    return new NextResponse(error, {
      status: 400,
    });
  }
}