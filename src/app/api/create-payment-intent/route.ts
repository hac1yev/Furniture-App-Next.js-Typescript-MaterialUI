import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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