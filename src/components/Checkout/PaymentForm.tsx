"use client";

import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import PageNavigations from "../PageNavigations/PageNavigations";
import { useEffect, useState } from "react";
import './Checkout.css'
import LoadingOverlay from "../LazyLoading/LoadingOverlay";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { shoppingSliceActions } from "@/store/shopping-slice";

export default function PaymentForm() {
  const stripe = useStripe();
  const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);
  const [oneItemPrice, setOneItemPrice] = useState<number | null>(null);
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const elements = useElements();
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    postalCode: "",
  });

  let totalPrice = 0; 

  if(myShoppingProducts) {
    totalPrice = myShoppingProducts.reduce((total: number, item: MyShoppingProductTypes) => {
      total += (item?.product?.price * item?.count);
      return total;
    }, 0);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const price = localStorage.getItem("oneItemPrice");
      setOneItemPrice(price ? parseFloat(price) : null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    
    if(!oneItemPrice && totalPrice === 0){
      Swal.fire(
        `You have to select a product!`,
        '',
        'error'
      );
      router.push('/products');
      return;
    }

    try {
      if (!stripe || !cardElement) {
        return null;
      };
      setIsLoading(true);
      const data = await axios.post("/api/create-payment-intent", {
        amount: oneItemPrice ? oneItemPrice : totalPrice,
      });

      const clientSecret = data.data;
      
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${cardDetails.firstName} ${cardDetails.lastName}`,
            email: cardDetails.email,
            phone: cardDetails.phoneNumber,
            address: {
              city: cardDetails.city,
              postal_code: cardDetails.postalCode,
            },
          },
        },
      });

      setIsLoading(false);

      if(paymentResult?.error?.message) {
        Swal.fire(
          `${paymentResult?.error?.message}`,
          '',
          'error'
        );
      }

      if(paymentResult?.paymentIntent?.status === "succeeded") {
        localStorage.removeItem("oneItemPrice");
        Swal.fire(
          `${'Payment was successful!'}`,
          '',
          'success'
        );
        if(!oneItemPrice) {
          await axios("/api/shopping", {
            method: 'DELETE'
          });
          dispatch(shoppingSliceActions.clearShoppingProducts());
        }
        router.push('/');
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const navigation_data = [
    {
      id: "p1",
      title: "Home",
      pathname: "/",
    },
    {
      id: "p2",
      title: "Checkout",
      pathname: "/checkout",
    },
  ];

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <>
      <Container
        component="div"
        maxWidth={false}
        sx={{ marginTop: 8, marginBottom: 5, width: "100%" }}
      >
        <PageNavigations arr={navigation_data} />
        <Typography variant="h1" sx={{ marginTop: 4 }}>CHECKOUT</Typography>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} xs={12} md={6}>
              <Grid item xs={12} sx={{p: 1}}>
                <Typography sx={{ fontSize: '18px', fontWeight: '700', alignSelf: 'flex-start' }}>PERSONAL INFORMATION</Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{p: 1}}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{p: 1}}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{p: 1}}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{p: 1}}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{p: 1}}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{p: 1}}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{p: 1, marginTop: 3}}>
                <Typography sx={{ fontSize: '18px', fontWeight: '700', alignSelf: 'flex-start' }}>CARD INFORMATION</Typography>
              </Grid>
              <Grid item xs={12} sx={{p: 1}}>
                <CardElement options={cardElementOptions} />
              </Grid>
            </Grid>
            <Grid container xs={12} md={6}>
              <Grid item xs={12} sx={{p: 1}}>
                <Button
                  size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: '#fff' }}
                >
                  Finish Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {isLoading && <LoadingOverlay overlayText="Loading..."/>}

    </>
  );
}
